# User Profile Management API Documentation

## Overview
Complete user profile management system with profile updates, password changes, activity tracking, and account management.

**Base URL:** `/api/v1/user`

**Authentication Required:** Yes (all endpoints)

---

## Endpoints

### 1. Get Current User (Basic Info)
Get basic information about the authenticated user.

**Endpoint:** `GET /current`

**Response:**
```json
{
  "message": "Current user fetched successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "profilePicture": "https://example.com/avatar.jpg",
    "description": "Software Developer",
    "isActive": true,
    "currentWorkspace": {
      "_id": "507f1f77bcf86cd799439012",
      "name": "My Workspace",
      "description": "Team workspace"
    },
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-11-02T14:20:00.000Z"
  }
}
```

---

### 2. Get User Profile (Detailed with Statistics)
Get comprehensive user profile including statistics and recent activity.

**Endpoint:** `GET /profile`

**Response:**
```json
{
  "message": "User profile fetched successfully",
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "profilePicture": "https://example.com/avatar.jpg",
      "description": "Software Developer passionate about open source",
      "isActive": true,
      "lastLogin": "2024-11-02T14:20:00.000Z",
      "currentWorkspace": {
        "_id": "507f1f77bcf86cd799439012",
        "name": "My Workspace",
        "description": "Team workspace",
        "createdAt": "2024-01-01T00:00:00.000Z"
      },
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-11-02T14:20:00.000Z"
    },
    "statistics": {
      "workspaces": 3,
      "projects": 12,
      "tasks": 45,
      "tasksByStatus": {
        "todo": 15,
        "in-progress": 20,
        "completed": 10,
        "total": 45
      }
    },
    "recentWorkspaces": [
      {
        "workspaceId": "507f1f77bcf86cd799439012",
        "name": "My Workspace",
        "description": "Team workspace",
        "role": "OWNER",
        "joinedAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

---

### 3. Update User Profile
Update user profile information.

**Endpoint:** `PUT /profile`

**Request Body:**
```json
{
  "name": "John Smith",
  "email": "john.smith@example.com",
  "profilePicture": "https://example.com/new-avatar.jpg",
  "description": "Senior Software Developer",
  "currentWorkspace": "507f1f77bcf86cd799439013"
}
```

**Validation Rules:**
- `name` (optional): 2-100 characters
- `email` (optional): Valid email format, must be unique
- `profilePicture` (optional): Valid URL or empty string to remove
- `description` (optional): Max 500 characters or empty string
- `currentWorkspace` (optional): Valid workspace ID where user is a member, or null
- **At least one field must be provided**

**Response:**
```json
{
  "message": "Profile updated successfully",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Smith",
    "email": "john.smith@example.com",
    "profilePicture": "https://example.com/new-avatar.jpg",
    "description": "Senior Software Developer",
    "currentWorkspace": {
      "_id": "507f1f77bcf86cd799439013",
      "name": "New Workspace",
      "description": "Updated workspace"
    },
    "updatedAt": "2024-11-02T14:25:00.000Z"
  }
}
```

**Error Responses:**
- `400 Bad Request`: Validation error or no fields provided
- `409 Conflict`: Email already in use
- `403 Forbidden`: Not a member of the specified workspace

---

### 4. Change Password
Change user password (only for local accounts, not OAuth).

**Endpoint:** `PUT /password`

**Request Body:**
```json
{
  "currentPassword": "OldPassword123",
  "newPassword": "NewPassword123",
  "confirmPassword": "NewPassword123"
}
```

**Validation Rules:**
- `currentPassword` (required): Current password
- `newPassword` (required): 
  - Min 8 characters, max 128 characters
  - Must contain at least one uppercase letter
  - Must contain at least one lowercase letter
  - Must contain at least one number
  - Must be different from current password
- `confirmPassword` (required): Must match newPassword

**Response:**
```json
{
  "message": "Password changed successfully"
}
```

**Error Responses:**
- `400 Bad Request`: Validation error or passwords don't match
- `401 Unauthorized`: Current password is incorrect
- `403 Forbidden`: Cannot change password for OAuth accounts

---

### 5. Get User Activity Logs
Get paginated activity logs for the user.

**Endpoint:** `GET /activity`

**Query Parameters:**
- `limit` (optional): Items per page (1-100, default: 50)
- `page` (optional): Page number (default: 1)
- `type` (optional): Filter by resource type
  - Values: `workspace`, `project`, `task`, `member`, `all`
  - Default: `all`
- `startDate` (optional): Filter activities after this date (ISO 8601)
- `endDate` (optional): Filter activities before this date (ISO 8601)

**Example Request:**
```
GET /activity?limit=20&page=1&type=project&startDate=2024-10-01T00:00:00Z
```

**Response:**
```json
{
  "message": "Activity logs fetched successfully",
  "data": {
    "activities": [
      {
        "_id": "507f1f77bcf86cd799439020",
        "user": "507f1f77bcf86cd799439011",
        "action": "project_created",
        "resourceType": "project",
        "resourceId": "507f1f77bcf86cd799439015",
        "workspace": {
          "_id": "507f1f77bcf86cd799439012",
          "name": "My Workspace"
        },
        "metadata": {
          "projectName": "New Project"
        },
        "createdAt": "2024-11-02T14:20:00.000Z"
      },
      {
        "_id": "507f1f77bcf86cd799439021",
        "user": "507f1f77bcf86cd799439011",
        "action": "task_completed",
        "resourceType": "task",
        "resourceId": "507f1f77bcf86cd799439016",
        "workspace": {
          "_id": "507f1f77bcf86cd799439012",
          "name": "My Workspace"
        },
        "metadata": {
          "taskTitle": "Complete API documentation"
        },
        "createdAt": "2024-11-02T13:15:00.000Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 5,
      "totalItems": 98,
      "itemsPerPage": 20,
      "hasNextPage": true,
      "hasPrevPage": false
    },
    "summary": {
      "workspace": 15,
      "project": 30,
      "task": 45,
      "member": 5,
      "user": 3
    }
  }
}
```

---

### 6. Deactivate Account
Soft delete user account (sets isActive to false).

**Endpoint:** `DELETE /account`

**Response:**
```json
{
  "message": "Account deactivated successfully"
}
```

**Notes:**
- Account is soft-deleted (not permanently removed)
- User is automatically logged out
- Session/cookies are cleared
- User can be reactivated by admin if needed

---

## Activity Log Actions

The system tracks the following user actions:

### Workspace Actions
- `workspace_created` - User created a workspace
- `workspace_joined` - User joined a workspace
- `workspace_left` - User left a workspace
- `workspace_updated` - User updated workspace details
- `workspace_deleted` - User deleted a workspace

### Project Actions
- `project_created` - User created a project
- `project_updated` - User updated project details
- `project_deleted` - User deleted a project
- `project_archived` - User archived a project

### Task Actions
- `task_created` - User created a task
- `task_updated` - User updated task details
- `task_deleted` - User deleted a task
- `task_assigned` - User was assigned to a task
- `task_completed` - User completed a task
- `task_status_changed` - User changed task status

### Member Actions
- `member_added` - User added a member
- `member_removed` - User removed a member
- `member_role_updated` - User updated member role

### User Actions
- `profile_updated` - User updated their profile
- `password_changed` - User changed their password
- `login` - User logged in
- `logout` - User logged out

---

## Common Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Authentication required"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "User not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "An unexpected error occurred"
}
```

---

## Usage Examples

### cURL Examples

#### Get Profile
```bash
curl -X GET http://localhost:5000/api/v1/user/profile \
  -H "Cookie: connect.sid=your-session-cookie"
```

#### Update Profile
```bash
curl -X PUT http://localhost:5000/api/v1/user/profile \
  -H "Content-Type: application/json" \
  -H "Cookie: connect.sid=your-session-cookie" \
  -d '{
    "name": "John Smith",
    "description": "Senior Developer"
  }'
```

#### Change Password
```bash
curl -X PUT http://localhost:5000/api/v1/user/password \
  -H "Content-Type: application/json" \
  -H "Cookie: connect.sid=your-session-cookie" \
  -d '{
    "currentPassword": "OldPassword123",
    "newPassword": "NewPassword123",
    "confirmPassword": "NewPassword123"
  }'
```

#### Get Activity Logs
```bash
curl -X GET "http://localhost:5000/api/v1/user/activity?limit=20&type=project" \
  -H "Cookie: connect.sid=your-session-cookie"
```

---

## Notes

1. **Activity Logs Retention**: Activity logs are automatically deleted after 90 days
2. **OAuth Users**: Cannot change password for users authenticated via OAuth (Google)
3. **Email Uniqueness**: Email must be unique across all users
4. **Workspace Membership**: Can only set currentWorkspace to workspaces where user is a member
5. **Session Management**: Deactivating account automatically logs out the user
6. **Password Security**: New passwords must meet strength requirements

---

## Integration Tips

1. **Profile Updates**: Always validate email uniqueness on the client side before submission
2. **Password Changes**: Show password strength indicator for new password
3. **Activity Logs**: Use pagination and filtering to avoid overwhelming users
4. **Statistics**: Cache profile statistics on the client for better performance
5. **Error Handling**: Implement proper error handling for all validation errors
