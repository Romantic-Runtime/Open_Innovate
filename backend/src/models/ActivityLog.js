import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    action: {
        type: String,
        required: true,
        enum: [
            // Workspace actions
            'workspace_created',
            'workspace_joined',
            'workspace_left',
            'workspace_updated',
            'workspace_deleted',
            
            // Project actions
            'project_created',
            'project_updated',
            'project_deleted',
            'project_archived',
            
            // Task actions
            'task_created',
            'task_updated',
            'task_deleted',
            'task_assigned',
            'task_completed',
            'task_status_changed',
            
            // Member actions
            'member_added',
            'member_removed',
            'member_role_updated',
            
            // User actions
            'profile_updated',
            'password_changed',
            'login',
            'logout'
        ]
    },
    resourceType: {
        type: String,
        enum: ['workspace', 'project', 'task', 'member', 'user'],
        required: true
    },
    resourceId: {
        type: mongoose.Schema.Types.ObjectId,
        required: false // Not all actions have a resource (e.g., login)
    },
    workspace: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workspace',
        required: false // User actions might not be tied to a workspace
    },
    metadata: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    ipAddress: {
        type: String,
        required: false
    },
    userAgent: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

// Indexes for efficient querying
activityLogSchema.index({ user: 1, createdAt: -1 });
activityLogSchema.index({ workspace: 1, createdAt: -1 });
activityLogSchema.index({ resourceType: 1, resourceId: 1 });
activityLogSchema.index({ action: 1, createdAt: -1 });

// TTL index - automatically delete logs older than 90 days
activityLogSchema.index({ createdAt: 1 }, { expireAfterSeconds: 7776000 }); // 90 days

// Static method to log activity
activityLogSchema.statics.log = async function(data) {
    try {
        const log = new this(data);
        await log.save();
        return log;
    } catch (error) {
        console.error('Failed to log activity:', error);
        // Don't throw error - logging should not break the application
        return null;
    }
};

export const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);
export default ActivityLog;
