import { ROLES } from "../enum/role-enum.js";
import Member from "../models/Member.js";
import Roles from "../models/Roles.js";
import Workspace from "../models/Workspace.js";
import User from "../models/User.js";
export const getMemberRoleInWorkspaceService = async (userId, workspaceId) => {
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
        throw new Error("Workspace not found");
    }
    const member = await Member.findOne({
        userId, workspaceId
    }).populate('role');
    if (!member) {
        throw new Error("User is not a member of this workspace");
    }
    const rolename = member.role?.name
    return { rolename };
}

export const joinWorkspaceService = async (inviteCode, userId) => {
    const workspace = await Workspace.findOne({ inviteCode })
    if (!workspace) { throw new Error("Invitation code is invalid"); }

    //checking if user is already a member
    const existingMember = await Member.findOne({ userId, workspaceId: workspace._id }).exec();
    if (existingMember) {
        throw new Error("User is already a member of this workspace");
    }

    const role=await Roles.findOne({name:ROLES.MEMBER});
    if(!role){
        throw new Error("Member role not found. Please seed roles first.");
    }
    const member=new Member({
        userId,
        workspaceId:workspace._id,
        role:role._id,
        joinedAt:new Date()
    });
    await member.save();
    return { workspaceId: workspace._id, role: role.name };
}

/**
 * Get all members in a workspace with their details
 */
export const getAllMembersInWorkspaceService = async (workspaceId) => {
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
        const error = new Error("Workspace not found");
        error.statusCode = 404;
        throw error;
    }

    const members = await Member.find({ workspaceId })
        .populate('userId', 'name email profilePicture')
        .populate('role', 'name permissions')
        .sort({ joinedAt: -1 });

    return { members };
}

/**
 * Get member by ID with full details
 */
export const getMemberByIdService = async (memberId, workspaceId) => {
    const member = await Member.findOne({ _id: memberId, workspaceId })
        .populate('userId', 'name email profilePicture')
        .populate('role', 'name permissions');

    if (!member) {
        const error = new Error("Member not found in this workspace");
        error.statusCode = 404;
        throw error;
    }

    return { member };
}

/**
 * Add member to workspace by email
 */
export const addMemberByEmailService = async (workspaceId, email, roleId) => {
    // Check if workspace exists
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
        const error = new Error("Workspace not found");
        error.statusCode = 404;
        throw error;
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        const error = new Error("User with this email not found");
        error.statusCode = 404;
        throw error;
    }

    // Check if user is already a member
    const existingMember = await Member.findOne({ 
        userId: user._id, 
        workspaceId 
    });
    
    if (existingMember) {
        const error = new Error("User is already a member of this workspace");
        error.statusCode = 400;
        throw error;
    }

    // Get role (default to MEMBER if not provided)
    let role;
    if (roleId) {
        role = await Roles.findById(roleId);
        if (!role) {
            const error = new Error("Role not found");
            error.statusCode = 404;
            throw error;
        }
    } else {
        role = await Roles.findOne({ name: ROLES.MEMBER });
        if (!role) {
            const error = new Error("Member role not found. Please seed roles first.");
            error.statusCode = 500;
            throw error;
        }
    }

    // Create member
    const member = new Member({
        userId: user._id,
        workspaceId,
        role: role._id,
        joinedAt: new Date()
    });

    await member.save();

    // Populate member details
    await member.populate([
        { path: 'userId', select: 'name email profilePicture' },
        { path: 'role', select: 'name permissions' }
    ]);

    return { member };
}

/**
 * Update member role
 */
export const updateMemberRoleService = async (memberId, workspaceId, roleId) => {
    // Find member
    const member = await Member.findOne({ _id: memberId, workspaceId });
    if (!member) {
        const error = new Error("Member not found in this workspace");
        error.statusCode = 404;
        throw error;
    }

    // Check if the member is the workspace owner
    const workspace = await Workspace.findById(workspaceId);
    if (workspace.createdBy.toString() === member.userId.toString()) {
        const error = new Error("Cannot change the role of the workspace owner");
        error.statusCode = 403;
        throw error;
    }

    // Verify new role exists
    const role = await Roles.findById(roleId);
    if (!role) {
        const error = new Error("Role not found");
        error.statusCode = 404;
        throw error;
    }

    // Update role
    member.role = roleId;
    await member.save();

    // Populate member details
    await member.populate([
        { path: 'userId', select: 'name email profilePicture' },
        { path: 'role', select: 'name permissions' }
    ]);

    return { member };
}

/**
 * Remove member from workspace
 */
export const removeMemberFromWorkspaceService = async (memberId, workspaceId, requestingUserId) => {
    // Find member
    const member = await Member.findOne({ _id: memberId, workspaceId });
    if (!member) {
        const error = new Error("Member not found in this workspace");
        error.statusCode = 404;
        throw error;
    }

    // Check if trying to remove the workspace owner
    const workspace = await Workspace.findById(workspaceId);
    if (workspace.createdBy.toString() === member.userId.toString()) {
        const error = new Error("Cannot remove the workspace owner");
        error.statusCode = 403;
        throw error;
    }

    // Check if member is trying to remove themselves
    const isSelfRemoval = member.userId.toString() === requestingUserId.toString();

    // Populate before deleting
    await member.populate([
        { path: 'userId', select: 'name email profilePicture' },
        { path: 'role', select: 'name permissions' }
    ]);

    // Delete member
    await Member.findByIdAndDelete(memberId);

    return { member, isSelfRemoval };
}

/**
 * Leave workspace (self-removal)
 */
export const leaveWorkspaceService = async (userId, workspaceId) => {
    // Find member
    const member = await Member.findOne({ userId, workspaceId });
    if (!member) {
        const error = new Error("You are not a member of this workspace");
        error.statusCode = 404;
        throw error;
    }

    // Check if user is the workspace owner
    const workspace = await Workspace.findById(workspaceId);
    if (workspace.createdBy.toString() === userId.toString()) {
        const error = new Error("Workspace owner cannot leave. Transfer ownership or delete the workspace instead.");
        error.statusCode = 403;
        throw error;
    }

    // Populate before deleting
    await member.populate([
        { path: 'userId', select: 'name email profilePicture' },
        { path: 'role', select: 'name permissions' }
    ]);

    // Delete member
    await Member.findByIdAndDelete(member._id);

    return { member };
}

/**
 * Get member count in workspace
 */
export const getMemberCountService = async (workspaceId) => {
    const count = await Member.countDocuments({ workspaceId });
    return { count };
}
