import { ActivityLog } from '../models/ActivityLog.js';

/**
 * Activity Logger Utility
 * Helper functions to log user activities across the application
 */

/**
 * Log workspace-related activities
 */
export const logWorkspaceActivity = {
    created: async (userId, workspaceId, metadata = {}) => {
        return await ActivityLog.log({
            user: userId,
            action: 'workspace_created',
            resourceType: 'workspace',
            resourceId: workspaceId,
            workspace: workspaceId,
            metadata: {
                workspaceName: metadata.name,
                ...metadata
            }
        });
    },

    joined: async (userId, workspaceId, metadata = {}) => {
        return await ActivityLog.log({
            user: userId,
            action: 'workspace_joined',
            resourceType: 'workspace',
            resourceId: workspaceId,
            workspace: workspaceId,
            metadata
        });
    },

    left: async (userId, workspaceId, metadata = {}) => {
        return await ActivityLog.log({
            user: userId,
            action: 'workspace_left',
            resourceType: 'workspace',
            resourceId: workspaceId,
            workspace: workspaceId,
            metadata
        });
    },

    updated: async (userId, workspaceId, metadata = {}) => {
        return await ActivityLog.log({
            user: userId,
            action: 'workspace_updated',
            resourceType: 'workspace',
            resourceId: workspaceId,
            workspace: workspaceId,
            metadata
        });
    },

    deleted: async (userId, workspaceId, metadata = {}) => {
        return await ActivityLog.log({
            user: userId,
            action: 'workspace_deleted',
            resourceType: 'workspace',
            resourceId: workspaceId,
            metadata
        });
    }
};

/**
 * Log project-related activities
 */
export const logProjectActivity = {
    created: async (userId, projectId, workspaceId, metadata = {}) => {
        return await ActivityLog.log({
            user: userId,
            action: 'project_created',
            resourceType: 'project',
            resourceId: projectId,
            workspace: workspaceId,
            metadata: {
                projectName: metadata.name,
                ...metadata
            }
        });
    },

    updated: async (userId, projectId, workspaceId, metadata = {}) => {
        return await ActivityLog.log({
            user: userId,
            action: 'project_updated',
            resourceType: 'project',
            resourceId: projectId,
            workspace: workspaceId,
            metadata
        });
    },

    deleted: async (userId, projectId, workspaceId, metadata = {}) => {
        return await ActivityLog.log({
            user: userId,
            action: 'project_deleted',
            resourceType: 'project',
            resourceId: projectId,
            workspace: workspaceId,
            metadata
        });
    },

    archived: async (userId, projectId, workspaceId, metadata = {}) => {
        return await ActivityLog.log({
            user: userId,
            action: 'project_archived',
            resourceType: 'project',
            resourceId: projectId,
            workspace: workspaceId,
            metadata
        });
    }
};

/**
 * Log task-related activities
 */
export const logTaskActivity = {
    created: async (userId, taskId, workspaceId, metadata = {}) => {
        return await ActivityLog.log({
            user: userId,
            action: 'task_created',
            resourceType: 'task',
            resourceId: taskId,
            workspace: workspaceId,
            metadata: {
                taskTitle: metadata.title,
                ...metadata
            }
        });
    },

    updated: async (userId, taskId, workspaceId, metadata = {}) => {
        return await ActivityLog.log({
            user: userId,
            action: 'task_updated',
            resourceType: 'task',
            resourceId: taskId,
            workspace: workspaceId,
            metadata
        });
    },

    deleted: async (userId, taskId, workspaceId, metadata = {}) => {
        return await ActivityLog.log({
            user: userId,
            action: 'task_deleted',
            resourceType: 'task',
            resourceId: taskId,
            workspace: workspaceId,
            metadata
        });
    },

    assigned: async (userId, taskId, workspaceId, metadata = {}) => {
        return await ActivityLog.log({
            user: metadata.assignedTo || userId,
            action: 'task_assigned',
            resourceType: 'task',
            resourceId: taskId,
            workspace: workspaceId,
            metadata: {
                assignedBy: userId,
                ...metadata
            }
        });
    },

    completed: async (userId, taskId, workspaceId, metadata = {}) => {
        return await ActivityLog.log({
            user: userId,
            action: 'task_completed',
            resourceType: 'task',
            resourceId: taskId,
            workspace: workspaceId,
            metadata
        });
    },

    statusChanged: async (userId, taskId, workspaceId, metadata = {}) => {
        return await ActivityLog.log({
            user: userId,
            action: 'task_status_changed',
            resourceType: 'task',
            resourceId: taskId,
            workspace: workspaceId,
            metadata: {
                oldStatus: metadata.oldStatus,
                newStatus: metadata.newStatus,
                ...metadata
            }
        });
    }
};

/**
 * Log member-related activities
 */
export const logMemberActivity = {
    added: async (userId, memberId, workspaceId, metadata = {}) => {
        return await ActivityLog.log({
            user: userId,
            action: 'member_added',
            resourceType: 'member',
            resourceId: memberId,
            workspace: workspaceId,
            metadata: {
                addedMember: metadata.email || metadata.memberName,
                ...metadata
            }
        });
    },

    removed: async (userId, memberId, workspaceId, metadata = {}) => {
        return await ActivityLog.log({
            user: userId,
            action: 'member_removed',
            resourceType: 'member',
            resourceId: memberId,
            workspace: workspaceId,
            metadata
        });
    },

    roleUpdated: async (userId, memberId, workspaceId, metadata = {}) => {
        return await ActivityLog.log({
            user: userId,
            action: 'member_role_updated',
            resourceType: 'member',
            resourceId: memberId,
            workspace: workspaceId,
            metadata: {
                oldRole: metadata.oldRole,
                newRole: metadata.newRole,
                ...metadata
            }
        });
    }
};

/**
 * Log user authentication activities
 */
export const logAuthActivity = {
    login: async (userId, metadata = {}) => {
        return await ActivityLog.log({
            user: userId,
            action: 'login',
            resourceType: 'user',
            resourceId: userId,
            metadata: {
                loginMethod: metadata.provider || 'local',
                ...metadata
            },
            ipAddress: metadata.ipAddress,
            userAgent: metadata.userAgent
        });
    },

    logout: async (userId, metadata = {}) => {
        return await ActivityLog.log({
            user: userId,
            action: 'logout',
            resourceType: 'user',
            resourceId: userId,
            metadata,
            ipAddress: metadata.ipAddress,
            userAgent: metadata.userAgent
        });
    }
};

/**
 * Generic activity logger with request context
 */
export const logActivity = async (req, action, resourceType, resourceId, metadata = {}) => {
    if (!req.user || !req.user.id) {
        console.warn('Cannot log activity: User not authenticated');
        return null;
    }

    return await ActivityLog.log({
        user: req.user.id,
        action,
        resourceType,
        resourceId,
        workspace: metadata.workspace || req.body?.workspace || req.params?.workspaceId,
        metadata,
        ipAddress: req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        userAgent: req.headers['user-agent']
    });
};

/**
 * Batch log multiple activities
 */
export const logBatchActivities = async (activities) => {
    try {
        const logs = activities.map(activity => new ActivityLog(activity));
        return await ActivityLog.insertMany(logs);
    } catch (error) {
        console.error('Failed to log batch activities:', error);
        return null;
    }
};

export default {
    logWorkspaceActivity,
    logProjectActivity,
    logTaskActivity,
    logMemberActivity,
    logAuthActivity,
    logActivity,
    logBatchActivities
};
