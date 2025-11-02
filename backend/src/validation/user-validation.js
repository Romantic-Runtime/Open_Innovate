import { z } from 'zod';

/**
 * Validation schema for updating user profile
 */
export const updateProfileSchema = z.object({
    name: z.string()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name must not exceed 100 characters')
        .trim()
        .optional(),
    
    email: z.string()
        .email('Invalid email format')
        .toLowerCase()
        .trim()
        .optional(),
    
    profilePicture: z.string()
        .url('Profile picture must be a valid URL')
        .optional()
        .or(z.literal('')), // Allow empty string to remove profile picture
    
    description: z.string()
        .max(500, 'Description must not exceed 500 characters')
        .optional()
        .or(z.literal('')), // Allow empty string
    
    currentWorkspace: z.string()
        .regex(/^[0-9a-fA-F]{24}$/, 'Invalid workspace ID format')
        .optional()
        .or(z.null()), // Allow null to clear current workspace
}).strict()
    .refine((data) => Object.keys(data).length > 0, {
        message: 'At least one field must be provided for update'
    });

/**
 * Validation schema for changing password
 */
export const changePasswordSchema = z.object({
    currentPassword: z.string()
        .min(1, 'Current password is required'),
    
    newPassword: z.string()
        .min(8, 'New password must be at least 8 characters')
        .max(128, 'New password must not exceed 128 characters')
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            'Password must contain at least one uppercase letter, one lowercase letter, and one number'
        ),
    
    confirmPassword: z.string()
        .min(1, 'Password confirmation is required')
}).strict()
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword']
    })
    .refine((data) => data.currentPassword !== data.newPassword, {
        message: 'New password must be different from current password',
        path: ['newPassword']
    });

/**
 * Validation schema for activity query parameters
 */
export const activityQuerySchema = z.object({
    limit: z.string()
        .optional()
        .transform((val) => val ? parseInt(val) : 50)
        .refine((val) => val > 0 && val <= 100, {
            message: 'Limit must be between 1 and 100'
        }),
    
    page: z.string()
        .optional()
        .transform((val) => val ? parseInt(val) : 1)
        .refine((val) => val > 0, {
            message: 'Page must be greater than 0'
        }),
    
    type: z.enum(['workspace', 'project', 'task', 'member', 'all'])
        .optional()
        .default('all'),
    
    startDate: z.string()
        .datetime()
        .optional(),
    
    endDate: z.string()
        .datetime()
        .optional()
}).optional();
