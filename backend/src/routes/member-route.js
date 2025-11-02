import { Router } from "express";
import { 
    joinWorkspaceController,
    getAllMembersController,
    getMemberByIdController,
    addMemberByEmailController,
    updateMemberRoleController,
    removeMemberController,
    leaveWorkspaceController,
    getMemberCountController
} from "../controller/member-controller.js";

const memberRoute = Router();

// Join workspace via invite code
memberRoute.post('/workspace/:inviteCode/join', joinWorkspaceController);

// Get all members in workspace
memberRoute.get('/workspace/:workspaceId/all', getAllMembersController);

// Get member count
memberRoute.get('/workspace/:workspaceId/count', getMemberCountController);

// Get member by ID
memberRoute.get('/:memberId/workspace/:workspaceId', getMemberByIdController);

// Add member by email
memberRoute.post('/workspace/:workspaceId/add', addMemberByEmailController);

// Update member role
memberRoute.put('/:memberId/workspace/:workspaceId/role', updateMemberRoleController);

// Leave workspace (self-removal)
memberRoute.post('/workspace/:workspaceId/leave', leaveWorkspaceController);

// Remove member from workspace
memberRoute.delete('/:memberId/workspace/:workspaceId', removeMemberController);

export default memberRoute;