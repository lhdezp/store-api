
import { Router } from "express";

import { getAllUsers, 
         getUserByName,
         createUser, 
         updateUser, 
         deleteUser } from "../controllers/user.controller.js";

import { validateJWT } from "../middleware/validateJWT.js";

const router = Router();

// Get all users
router.get('/', validateJWT, getAllUsers);

// Get users by name
router.get("/:name", validateJWT,  getUserByName)

// Create new user
router.post("/", validateJWT,createUser);

// Update user by name
router.patch("/:name", validateJWT, updateUser);

// Delete user by name
router.delete("/:name", validateJWT, deleteUser);


export  {router};
