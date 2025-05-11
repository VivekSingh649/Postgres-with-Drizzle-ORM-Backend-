import { Router } from "express";
import { createUser, deleteUserById, getAllUsers, getUserById, updateUserId } from "../controller/userController";
import { schemaValidate } from "../middleware/validationMiddleware";
import { UserSchema } from "../validator/userValidator";

const userRouter = Router();

// Create user profile
userRouter.post('/create', schemaValidate(UserSchema), createUser);

// Get all user list
userRouter.get('/users', getAllUsers);

// Get user by ID (Single User)
userRouter.get('/user/:id', getUserById)

// Delete user by ID 
userRouter.delete('/delete/:id', deleteUserById)

// Update user by ID
userRouter.put('/update/:id', schemaValidate(UserSchema), updateUserId)

export default userRouter;