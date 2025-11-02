import { z } from "zod";

// Member ID validation
export const memberIdSchema = z.string().min(1, "Member ID is required");

// User ID validation
export const userIdSchema = z.string().min(1, "User ID is required");

// Workspace ID validation
export const workspaceIdSchema = z.string().min(1, "Workspace ID is required");

// Role ID validation
export const roleIdSchema = z.string().min(1, "Role ID is required");

// Invite code validation
export const inviteCodeSchema = z.string().min(1, "Invite code is required");

// Add member schema (invite by email)
export const addMemberByEmailSchema = z.object({
    email: z.string().email("Valid email is required"),
    roleId: z.string().optional()
});

// Update member role schema
export const updateMemberRoleSchema = z.object({
    roleId: z.string().min(1, "Role ID is required")
});

// Remove member schema (for confirmation)
export const removeMemberSchema = z.object({
    confirm: z.boolean().optional()
});
