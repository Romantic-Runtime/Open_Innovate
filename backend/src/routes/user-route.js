import { Router } from "express";
import {
    getCurrentUserController,
    getUserProfileController,
    updateUserProfileController,
    changePasswordController,
    getUserActivityController,
    deactivateUserController
} from "../controller/user-controller.js";

const userroutes = Router();

// Get current user (basic info)
userroutes.get("/current", getCurrentUserController);

// Get detailed user profile with statistics
userroutes.get("/profile", getUserProfileController);

// Update user profile
userroutes.put("/profile", updateUserProfileController);

// Change password
userroutes.put("/password", changePasswordController);

// Get user activity logs
userroutes.get("/activity", getUserActivityController);

// Deactivate account
userroutes.delete("/account", deactivateUserController);

export default userroutes;