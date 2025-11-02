import { User, Workspace, Member, Project, Task, ActivityLog } from "../models/index.js";
import bcrypt from "bcrypt";

/**
 * Fetch current authenticated user
 */
export const fetchCurrentUser = async (userId) => {
    const user = await User.findById(userId)
        .populate('currentWorkspace', 'name description')
        .select('-password');
    
    if (!user) {
        throw new Error("User not found");
    }

    return { user };
};

/**
 * Get detailed user profile with statistics
 */
export const getUserProfileService = async (userId) => {
    const user = await User.findById(userId)
        .populate('currentWorkspace', 'name description createdAt')
        .select('-password');
    
    if (!user) {
        throw new Error("User not found");
    }

    // Get user statistics
    const [workspaceCount, projectCount, taskCount, memberCount] = await Promise.all([
        Member.countDocuments({ user: userId }),
        Project.countDocuments({ 
            workspace: { $in: await Member.find({ user: userId }).distinct('workspace') }
        }),
        Task.countDocuments({ assignedTo: userId }),
        Member.countDocuments({ user: userId })
    ]);

    // Get recent workspaces
    const recentWorkspaces = await Member.find({ user: userId })
        .populate('workspace', 'name description')
        .sort({ updatedAt: -1 })
        .limit(5)
        .lean();

    // Get tasks by status
    const tasksByStatus = await Task.aggregate([
        { $match: { assignedTo: userId } },
        { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const taskStats = {
        todo: 0,
        'in-progress': 0,
        completed: 0,
        total: taskCount
    };

    tasksByStatus.forEach(stat => {
        taskStats[stat._id] = stat.count;
    });

    return {
        user: user.toObject(),
        statistics: {
            workspaces: workspaceCount,
            projects: projectCount,
            tasks: taskCount,
            tasksByStatus: taskStats
        },
        recentWorkspaces: recentWorkspaces.map(m => ({
            workspaceId: m.workspace._id,
            name: m.workspace.name,
            description: m.workspace.description,
            role: m.role,
            joinedAt: m.createdAt
        }))
    };
};

/**
 * Update user profile
 */
export const updateUserProfileService = async (userId, updateData) => {
    const user = await User.findById(userId);
    
    if (!user) {
        throw new Error("User not found");
    }

    // Check if email is being changed and if it's already taken
    if (updateData.email && updateData.email !== user.email) {
        const existingUser = await User.findOne({ 
            email: updateData.email,
            _id: { $ne: userId }
        });
        
        if (existingUser) {
            throw new Error("Email is already in use");
        }
    }

    // Check if workspace exists if being updated
    if (updateData.currentWorkspace) {
        const isMember = await Member.findOne({
            user: userId,
            workspace: updateData.currentWorkspace
        });
        
        if (!isMember) {
            throw new Error("You are not a member of this workspace");
        }
    }

    // Update user fields
    Object.keys(updateData).forEach(key => {
        user[key] = updateData[key];
    });

    await user.save();

    // Log activity
    await ActivityLog.log({
        user: userId,
        action: 'profile_updated',
        resourceType: 'user',
        resourceId: userId,
        metadata: {
            updatedFields: Object.keys(updateData)
        }
    });

    // Fetch updated user without password
    const updatedUser = await User.findById(userId)
        .populate('currentWorkspace', 'name description')
        .select('-password');

    return { user: updatedUser };
};

/**
 * Change user password
 */
export const changePasswordService = async (userId, currentPassword, newPassword) => {
    // Fetch user with password field
    const user = await User.findById(userId).select('+password');
    
    if (!user) {
        throw new Error("User not found");
    }

    // For OAuth users without password
    if (!user.password) {
        throw new Error("Cannot change password for OAuth accounts");
    }

    // Verify current password
    const isPasswordValid = await user.matchPassword(currentPassword);
    
    if (!isPasswordValid) {
        throw new Error("Current password is incorrect");
    }

    // Update password
    user.password = newPassword;
    await user.save();

    // Log activity
    await ActivityLog.log({
        user: userId,
        action: 'password_changed',
        resourceType: 'user',
        resourceId: userId,
        metadata: {
            timestamp: new Date()
        }
    });

    return { message: "Password changed successfully" };
};

/**
 * Get user activity logs
 */
export const getUserActivityService = async (userId, filters = {}) => {
    const {
        limit = 50,
        page = 1,
        type = 'all',
        startDate,
        endDate
    } = filters;

    const skip = (page - 1) * limit;

    // Build query
    const query = { user: userId };

    // Filter by resource type
    if (type !== 'all') {
        query.resourceType = type;
    }

    // Filter by date range
    if (startDate || endDate) {
        query.createdAt = {};
        if (startDate) query.createdAt.$gte = new Date(startDate);
        if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    // Fetch activities with pagination
    const [activities, totalCount] = await Promise.all([
        ActivityLog.find(query)
            .populate('workspace', 'name')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),
        ActivityLog.countDocuments(query)
    ]);

    // Get activity summary
    const activitySummary = await ActivityLog.aggregate([
        { $match: { user: userId } },
        { $group: { _id: '$resourceType', count: { $sum: 1 } } }
    ]);

    const summary = {};
    activitySummary.forEach(item => {
        summary[item._id] = item.count;
    });

    return {
        activities,
        pagination: {
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit),
            totalItems: totalCount,
            itemsPerPage: limit,
            hasNextPage: page * limit < totalCount,
            hasPrevPage: page > 1
        },
        summary
    };
};

/**
 * Deactivate user account (soft delete)
 */
export const deactivateUserService = async (userId) => {
    const user = await User.findById(userId);
    
    if (!user) {
        throw new Error("User not found");
    }

    user.isActive = false;
    await user.save();

    // Log activity
    await ActivityLog.log({
        user: userId,
        action: 'logout',
        resourceType: 'user',
        resourceId: userId,
        metadata: {
            reason: 'account_deactivation'
        }
    });

    return { message: "Account deactivated successfully" };
};