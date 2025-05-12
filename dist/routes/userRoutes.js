"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const validationMiddleware_1 = require("../middleware/validationMiddleware");
const userValidator_1 = require("../validator/userValidator");
const userRouter = (0, express_1.Router)();
// Create user profile
userRouter.post('/create', (0, validationMiddleware_1.schemaValidate)(userValidator_1.UserSchema), userController_1.createUser);
// Get all user list
userRouter.get('/users', userController_1.getAllUsers);
// Get user by ID (Single User)
userRouter.get('/user/:id', userController_1.getUserById);
// Delete user by ID 
userRouter.delete('/delete/:id', userController_1.deleteUserById);
// Update user by ID
userRouter.put('/update/:id', (0, validationMiddleware_1.schemaValidate)(userValidator_1.UserSchema), userController_1.updateUserId);
exports.default = userRouter;
//# sourceMappingURL=userRoutes.js.map