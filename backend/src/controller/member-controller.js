import { z } from "zod";
import { 
    joinWorkspaceService, 
    getAllMembersInWorkspaceService,
    getMemberByIdService,
    addMemberByEmailService,
    updateMemberRoleService,
    removeMemberFromWorkspaceService,
    leaveWorkspaceService,
    getMemberCountService,
    getMemberRoleInWorkspaceService
} from "../services/member-services.js";
import {
    memberIdSchema,
    workspaceIdSchema,
    inviteCodeSchema,
    addMemberByEmailSchema,
    updateMemberRoleSchema
} from "../validation/member-validation.js";
import { Permissions } from "../enum/role-enum.js";
import { roleGuard } from "../utils/roleGuard.js";

/**
 * Join workspace via invite code
 * POST /member/workspace/:inviteCode/join
 */
export const joinWorkspaceController = async (req, res) => {
    const inviteCode = inviteCodeSchema.parse(req.params.inviteCode);
    const userId = req.user?._id;

    const { workspaceId, role } = await joinWorkspaceService(inviteCode, userId);
    res.status(200).json({ message: "Joined workspace successfully", workspaceId, role });
}

/**
 * Get all members in a workspace
 * GET /member/workspace/:workspaceId/all
 */
export const getAllMembersController = async (req, res) => {
    const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);
    const userId = req.user?._id;

    // Check user is member and has view permission
    const { rolename } = await getMemberRoleInWorkspaceService(userId, workspaceId);
    roleGuard(rolename, [Permissions.VIEW_ONLY]);

    const { members } = await getAllMembersInWorkspaceService(workspaceId);

    res.status(200).json({ 
        message: "Members retrieved successfully", 
        members,
        totalMembers: members.length 
    });
}

/**
 * Get member by ID
 * GET /member/:memberId/workspace/:workspaceId
 */
export const getMemberByIdController = async (req, res) => {
    const memberId = memberIdSchema.parse(req.params.memberId);
    const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);
    const userId = req.user?._id;

    // Check user is member and has view permission
    const { rolename } = await getMemberRoleInWorkspaceService(userId, workspaceId);
    roleGuard(rolename, [Permissions.VIEW_ONLY]);

    const { member } = await getMemberByIdService(memberId, workspaceId);

    res.status(200).json({ message: "Member retrieved successfully", member });
}

/**
 * Add member to workspace by email
 * POST /member/workspace/:workspaceId/add
 */
export const addMemberByEmailController = async (req, res) => {
    const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);
    const { email, roleId } = addMemberByEmailSchema.parse(req.body);
    const userId = req.user?._id;

    // Check user has permission to add members
    const { rolename } = await getMemberRoleInWorkspaceService(userId, workspaceId);
    roleGuard(rolename, [Permissions.ADD_MEMBER]);

    const { member } = await addMemberByEmailService(workspaceId, email, roleId);

    res.status(201).json({ message: "Member added successfully", member });
}

/**
 * Update member role
 * PUT /member/:memberId/workspace/:workspaceId/role
 */
export const updateMemberRoleController = async (req, res) => {
    const memberId = memberIdSchema.parse(req.params.memberId);
    const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);
    const { roleId } = updateMemberRoleSchema.parse(req.body);
    const userId = req.user?._id;

    // Check user has permission to change member roles
    const { rolename } = await getMemberRoleInWorkspaceService(userId, workspaceId);
    roleGuard(rolename, [Permissions.CHANGE_MEMBER_ROLE]);

    const { member } = await updateMemberRoleService(memberId, workspaceId, roleId);

    res.status(200).json({ message: "Member role updated successfully", member });
}

/**
 * Remove member from workspace
 * DELETE /member/:memberId/workspace/:workspaceId
 */
export const removeMemberController = async (req, res) => {
    const memberId = memberIdSchema.parse(req.params.memberId);
    const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);
    const userId = req.user?._id;

    // Check user has permission to remove members
    const { rolename } = await getMemberRoleInWorkspaceService(userId, workspaceId);
    roleGuard(rolename, [Permissions.REMOVE_MEMBER]);

    const { member, isSelfRemoval } = await removeMemberFromWorkspaceService(
        memberId, 
        workspaceId, 
        userId
    );

    res.status(200).json({ 
        message: isSelfRemoval 
            ? "You have left the workspace successfully" 
            : "Member removed successfully", 
        member 
    });
}

/**
 * Leave workspace (self-removal)
 * POST /member/workspace/:workspaceId/leave
 */
export const leaveWorkspaceController = async (req, res) => {
    const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);
    const userId = req.user?._id;

    const { member } = await leaveWorkspaceService(userId, workspaceId);

    res.status(200).json({ message: "You have left the workspace successfully", member });
}

/**
 * Get member count in workspace
 * GET /member/workspace/:workspaceId/count
 */
export const getMemberCountController = async (req, res) => {
    const workspaceId = workspaceIdSchema.parse(req.params.workspaceId);
    const userId = req.user?._id;

    // Check user is member
    const { rolename } = await getMemberRoleInWorkspaceService(userId, workspaceId);
    roleGuard(rolename, [Permissions.VIEW_ONLY]);

    const { count } = await getMemberCountService(workspaceId);

    res.status(200).json({ message: "Member count retrieved successfully", count });
}