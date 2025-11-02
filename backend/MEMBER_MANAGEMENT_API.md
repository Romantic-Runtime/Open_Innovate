# Member Management System - API Documentation

## Overview
Complete Member Management system with CRUD operations, role management, and workspace access control.

---

## Authentication
All member endpoints require authentication. Include session cookie in requests.

---

## Endpoints

### 1. Join Workspace (via Invite Code)
**POST** `/api/v1/member/workspace/:inviteCode/join`

Join a workspace using an invite code.

**Path Parameters:**
- `inviteCode` - Workspace invite code (string)

**Response (200):**
```json
{
  "message": "Joined workspace successfully",
  "workspaceId": "workspace_id",
  "role": "MEMBER"
}
```

---

### 2. Get All Members in Workspace
**GET** `/api/v1/member/workspace/:workspaceId/all`

Get all members in a workspace with their details.

**Required Permission:** `VIEW_ONLY`

**Path Parameters:**
- `workspaceId` - Workspace ID (string)

**Response (200):**
```json
{
  "message": "Members retrieved successfully",
  "members": [
    {
      "_id": "member_id",
      "userId": {
        "_id": "user_id",
        "name": "John Doe",
        "email": "john@example.com",
        "profilePicture": "url"
      },
      "workspaceId": "workspace_id",
      "role": {
        "_id": "role_id",
        "name": "ADMIN",
        "permissions": ["CREATE_PROJECT", "EDIT", "VIEW_ONLY"]
      },
      "joinedAt": "2025-11-02T10:30:00.000Z",
      "createdAt": "2025-11-02T10:30:00.000Z"
    }
  ],
  "totalMembers": 5
}
```

---

### 3. Get Member by ID
**GET** `/api/v1/member/:memberId/workspace/:workspaceId`

Get detailed information about a specific member.

**Required Permission:** `VIEW_ONLY`

**Path Parameters:**
- `memberId` - Member ID (string)
- `workspaceId` - Workspace ID (string)

**Response (200):**
```json
{
  "message": "Member retrieved successfully",
  "member": {
    "_id": "member_id",
    "userId": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "profilePicture": "url"
    },
    "workspaceId": "workspace_id",
    "role": {
      "_id": "role_id",
      "name": "MEMBER",
      "permissions": ["VIEW_ONLY"]
    },
    "joinedAt": "2025-11-02T10:30:00.000Z"
  }
}
```

---

### 4. Add Member by Email
**POST** `/api/v1/member/workspace/:workspaceId/add`

Add a new member to the workspace by their email address.

**Required Permission:** `ADD_MEMBER`

**Path Parameters:**
- `workspaceId` - Workspace ID (string)

**Request Body:**
```json
{
  "email": "newmember@example.com",
  "roleId": "role_id_optional"
}
```

**Note:** If `roleId` is not provided, the user will be added with the default MEMBER role.

**Response (201):**
```json
{
  "message": "Member added successfully",
  "member": {
    "_id": "member_id",
    "userId": {
      "_id": "user_id",
      "name": "New Member",
      "email": "newmember@example.com",
      "profilePicture": "url"
    },
    "workspaceId": "workspace_id",
    "role": {
      "_id": "role_id",
      "name": "MEMBER",
      "permissions": ["VIEW_ONLY"]
    },
    "joinedAt": "2025-11-02T15:00:00.000Z"
  }
}
```

---

### 5. Update Member Role
**PUT** `/api/v1/member/:memberId/workspace/:workspaceId/role`

Update a member's role in the workspace.

**Required Permission:** `CHANGE_MEMBER_ROLE`

**Path Parameters:**
- `memberId` - Member ID (string)
- `workspaceId` - Workspace ID (string)

**Request Body:**
```json
{
  "roleId": "new_role_id"
}
```

**Important Notes:**
- Cannot change the role of the workspace owner
- Only Owner and Admin can change roles

**Response (200):**
```json
{
  "message": "Member role updated successfully",
  "member": {
    "_id": "member_id",
    "userId": {
      "_id": "user_id",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "role": {
      "_id": "new_role_id",
      "name": "ADMIN",
      "permissions": ["CREATE_PROJECT", "EDIT", "VIEW_ONLY"]
    }
  }
}
```

---

### 6. Remove Member from Workspace
**DELETE** `/api/v1/member/:memberId/workspace/:workspaceId`

Remove a member from the workspace.

**Required Permission:** `REMOVE_MEMBER`

**Path Parameters:**
- `memberId` - Member ID (string)
- `workspaceId` - Workspace ID (string)

**Important Notes:**
- Cannot remove the workspace owner
- Owner and Admin can remove members
- If removing yourself, use the "Leave Workspace" endpoint instead

**Response (200):**
```json
{
  "message": "Member removed successfully",
  "member": {
    "_id": "member_id",
    "userId": {
      "_id": "user_id",
      "name": "Removed Member",
      "email": "removed@example.com"
    },
    "role": {
      "name": "MEMBER"
    }
  }
}
```

---

### 7. Leave Workspace
**POST** `/api/v1/member/workspace/:workspaceId/leave`

Leave a workspace (self-removal).

**No special permission required** (any member can leave)

**Path Parameters:**
- `workspaceId` - Workspace ID (string)

**Important Notes:**
- Workspace owner cannot leave
- Owner must transfer ownership or delete workspace
- After leaving, you'll need a new invite to rejoin

**Response (200):**
```json
{
  "message": "You have left the workspace successfully",
  "member": {
    "_id": "member_id",
    "userId": {
      "_id": "user_id",
      "name": "Your Name",
      "email": "your@example.com"
    },
    "role": {
      "name": "MEMBER"
    }
  }
}
```

---

### 8. Get Member Count
**GET** `/api/v1/member/workspace/:workspaceId/count`

Get the total number of members in a workspace.

**Required Permission:** `VIEW_ONLY`

**Path Parameters:**
- `workspaceId` - Workspace ID (string)

**Response (200):**
```json
{
  "message": "Member count retrieved successfully",
  "count": 12
}
```

---

## Complete Member API Endpoints

| Method | Endpoint | Description | Permission |
|--------|----------|-------------|------------|
| POST | `/member/workspace/:inviteCode/join` | Join workspace | None (public with code) |
| GET | `/member/workspace/:wId/all` | Get all members | VIEW_ONLY |
| GET | `/member/:mId/workspace/:wId` | Get member by ID | VIEW_ONLY |
| POST | `/member/workspace/:wId/add` | Add member by email | ADD_MEMBER |
| PUT | `/member/:mId/workspace/:wId/role` | Update member role | CHANGE_MEMBER_ROLE |
| POST | `/member/workspace/:wId/leave` | Leave workspace | None (self) |
| DELETE | `/member/:mId/workspace/:wId` | Remove member | REMOVE_MEMBER |
| GET | `/member/workspace/:wId/count` | Get member count | VIEW_ONLY |

**Total: 8 endpoints**

---

## Permission Matrix

| Role | View Members | Add Members | Change Roles | Remove Members |
|------|--------------|-------------|--------------|----------------|
| **OWNER** | ✅ | ✅ | ✅ | ✅ |
| **ADMIN** | ✅ | ✅ | ✅ | ✅ |
| **MEMBER** | ✅ | ❌ | ❌ | ❌ (only self) |

**Special Rules:**
- ❌ Cannot change owner's role
- ❌ Cannot remove owner
- ❌ Owner cannot leave (must transfer or delete)
- ✅ Any member can leave workspace

---

## Testing with cURL

### Join Workspace:
```bash
curl -X POST http://localhost:8000/api/v1/member/workspace/INVITE_CODE/join \
  -b cookies.txt
```

### Get All Members:
```bash
curl -X GET http://localhost:8000/api/v1/member/workspace/WORKSPACE_ID/all \
  -b cookies.txt
```

### Add Member by Email:
```bash
curl -X POST http://localhost:8000/api/v1/member/workspace/WORKSPACE_ID/add \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "email": "newmember@example.com",
    "roleId": "ROLE_ID"
  }'
```

### Update Member Role:
```bash
curl -X PUT http://localhost:8000/api/v1/member/MEMBER_ID/workspace/WORKSPACE_ID/role \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "roleId": "NEW_ROLE_ID"
  }'
```

### Leave Workspace:
```bash
curl -X POST http://localhost:8000/api/v1/member/workspace/WORKSPACE_ID/leave \
  -b cookies.txt
```

### Remove Member:
```bash
curl -X DELETE http://localhost:8000/api/v1/member/MEMBER_ID/workspace/WORKSPACE_ID \
  -b cookies.txt
```

### Get Member Count:
```bash
curl -X GET http://localhost:8000/api/v1/member/workspace/WORKSPACE_ID/count \
  -b cookies.txt
```

---

## Error Responses

### 400 Bad Request
```json
{
  "error": "User is already a member of this workspace"
}
```

### 403 Forbidden
```json
{
  "error": "Cannot change the role of the workspace owner"
}
```
```json
{
  "error": "Workspace owner cannot leave. Transfer ownership or delete the workspace instead."
}
```

### 404 Not Found
```json
{
  "error": "User with this email not found"
}
```
```json
{
  "error": "Member not found in this workspace"
}
```

---

## Workflow Examples

### Example 1: Add New Team Member
```javascript
// Step 1: Admin adds member by email
POST /api/v1/member/workspace/123/add
{
  "email": "newdev@company.com"
}

// Step 2: Verify member was added
GET /api/v1/member/workspace/123/all

// Step 3: Update member role to Admin
PUT /api/v1/member/456/workspace/123/role
{
  "roleId": "admin_role_id"
}
```

### Example 2: Member Leaves Workspace
```javascript
// Step 1: Member decides to leave
POST /api/v1/member/workspace/123/leave

// Step 2: Verify member count decreased
GET /api/v1/member/workspace/123/count
```

### Example 3: Admin Removes Member
```javascript
// Step 1: Get all members to find member ID
GET /api/v1/member/workspace/123/all

// Step 2: Remove specific member
DELETE /api/v1/member/456/workspace/123

// Step 3: Confirm removal
GET /api/v1/member/workspace/123/all
```

---

## Validation Rules

### Add Member by Email:
- **email**: Required, valid email format
- **roleId**: Optional, defaults to MEMBER role
- User must exist in the system
- User cannot already be a member

### Update Member Role:
- **roleId**: Required, must be valid role ID
- Cannot change owner's role
- New role must exist

### Remove Member:
- Cannot remove workspace owner
- Member must exist in workspace

---

## Use Cases

### Add Member:
- ✅ Invite team members by email
- ✅ Assign custom roles during invitation
- ✅ Bulk invite (call endpoint multiple times)

### Update Role:
- ✅ Promote member to admin
- ✅ Demote admin to member
- ✅ Change team member permissions

### Remove Member:
- ✅ Remove inactive members
- ✅ Remove members who left company
- ✅ Clean up test accounts

### Leave Workspace:
- ✅ Voluntarily exit project
- ✅ Clean up personal memberships
- ✅ Switch to different workspace

---

## Testing Checklist

- [ ] Join workspace with valid invite code
- [ ] Try join with invalid invite code (should fail)
- [ ] Try join workspace you're already in (should fail)
- [ ] Get all members as MEMBER role
- [ ] Get single member details
- [ ] Add member by email as ADMIN
- [ ] Try add member as MEMBER (should fail with 403)
- [ ] Try add already existing member (should fail with 400)
- [ ] Update member role as OWNER
- [ ] Try update owner's role (should fail with 403)
- [ ] Leave workspace as MEMBER
- [ ] Try leave as OWNER (should fail with 403)
- [ ] Remove member as ADMIN
- [ ] Try remove owner (should fail with 403)
- [ ] Get member count

---

## Important Business Rules

1. **Workspace Owner Protection:**
   - Owner's role cannot be changed
   - Owner cannot be removed
   - Owner cannot leave workspace
   - Owner can only transfer ownership (future feature)

2. **Self-Service:**
   - Any member can leave workspace (except owner)
   - Members can view other members
   - Members cannot modify others

3. **Admin Capabilities:**
   - Can add new members
   - Can change member roles (except owner)
   - Can remove members (except owner)

4. **Member Lifecycle:**
   - Join → Active → Leave/Removed
   - Can rejoin with new invite code
   - Role persists until changed

---

## Summary

✅ **Complete Member CRUD** - All operations covered  
✅ **Role Management** - Update and assign roles  
✅ **Self-Service** - Members can leave independently  
✅ **Permission-Based** - Role-based access control  
✅ **Owner Protection** - Special rules for workspace owner  
✅ **Validated** - Input validation with Zod  
✅ **Safe** - Error handling and business rules  

The Member Management System is fully functional and ready to use! 🚀
