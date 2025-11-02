import {
    fetchCurrentUser,
    getUserProfileService,
    updateUserProfileService,
    changePasswordService,
    getUserActivityService,
    deactivateUserService
} from "../services/user-service.js";
import {
    updateProfileSchema,
    changePasswordSchema,
    activityQuerySchema
} from "../validation/user-validation.js";

/**
 * Get current authenticated user (basic info)
 * GET /api/v1/user/current
 */
export const getCurrentUserController = async (req, res) => {
    const { user } = await fetchCurrentUser(req.user.id);
    return res.status(200).json({
        message: "Current user fetched successfully",
        user
    });
};

/**
 * Get detailed user profile with statistics
 * GET /api/v1/user/profile
 */
export const getUserProfileController = async (req, res) => {
    const result = await getUserProfileService(req.user.id);
    
    return res.status(200).json({
        message: "User profile fetched successfully",
        data: result
    });
};

/**
 * Update user profile
 * PUT /api/v1/user/profile
 * Body: { name?, email?, profilePicture?, description?, currentWorkspace? }
 */
export const updateUserProfileController = async (req, res) => {
    // Validate request body
    const validatedData = updateProfileSchema.parse(req.body);
    
    const { user } = await updateUserProfileService(req.user.id, validatedData);
    
    return res.status(200).json({
        message: "Profile updated successfully",
        user
    });
};

/**
 * Change user password
 * PUT /api/v1/user/password
 * Body: { currentPassword, newPassword, confirmPassword }
 */
export const changePasswordController = async (req, res) => {
    // Validate request body
    const { currentPassword, newPassword } = changePasswordSchema.parse(req.body);
    
    const result = await changePasswordService(
        req.user.id,
        currentPassword,
        newPassword
    );
    
    return res.status(200).json(result);
};

/**
 * Get user activity logs
 * GET /api/v1/user/activity
 * Query: { limit?, page?, type?, startDate?, endDate? }
 */
export const getUserActivityController = async (req, res) => {
    // Validate and parse query parameters
    const filters = activityQuerySchema.parse(req.query);
    
    const result = await getUserActivityService(req.user.id, filters);
    
    return res.status(200).json({
        message: "Activity logs fetched successfully",
        data: result
    });
};

/**
 * Deactivate user account
 * DELETE /api/v1/user/account
 */
export const deactivateUserController = async (req, res) => {
    const result = await deactivateUserService(req.user.id);
    
    // Clear session/cookie after deactivation
    req.logout((err) => {
        if (err) {
            console.error('Logout error:', err);
        }
    });
    
    return res.status(200).json(result);
};