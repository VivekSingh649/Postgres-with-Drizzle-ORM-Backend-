"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserId = exports.createUser = exports.deleteUserById = exports.getUserById = exports.getAllUsers = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = __importDefault(require("../config/db"));
const schema_1 = require("../drizzle/schema");
const helper_1 = require("../helper/helper");
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield db_1.default.select().from(schema_1.usersTable);
        if (!users || users.length === 0) {
            res.status(404).json({
                success: false,
                message: "No user found!",
                data: null,
            });
            return;
        }
        return res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: users,
        });
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            data: null,
        });
    }
});
exports.getAllUsers = getAllUsers;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({
            success: false,
            message: "Bad Request: Missing userId",
            data: null,
        });
        return;
    }
    try {
        const user = yield db_1.default
            .select()
            .from(schema_1.usersTable)
            .where((0, drizzle_orm_1.eq)(schema_1.usersTable.id, id))
            .limit(1);
        if (!user || user.length === 0) {
            res.status(404).json({
                success: false,
                message: "User not found",
                data: null,
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "User retrieved successfully",
            data: user[0],
        });
    }
    catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            data: null,
        });
    }
});
exports.getUserById = getUserById;
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id) {
        res.status(400).json({
            success: false,
            message: "Bad Request: Missing userId",
            data: null,
        });
        return;
    }
    try {
        const user = yield db_1.default
            .delete(schema_1.usersTable)
            .where((0, drizzle_orm_1.eq)(schema_1.usersTable.id, id))
            .returning({
            id: schema_1.usersTable.id,
            userName: schema_1.usersTable.fullName,
            email: schema_1.usersTable.email,
        });
        res.status(200).json({
            success: true,
            message: "User delete successfully",
            data: user,
        });
    }
    catch (error) {
        console.error("Error deleting users:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            data: null,
        });
    }
});
exports.deleteUserById = deleteUserById;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const formData = req.body;
        const { email } = formData;
        const isUser = yield db_1.default
            .select({ email: schema_1.usersTable.email })
            .from(schema_1.usersTable)
            .where((0, drizzle_orm_1.eq)(schema_1.usersTable.email, email));
        if (isUser.length > 0) {
            return res.status(400).json((0, helper_1.sendResponse)(`${email} already exists`));
        }
        const user = yield db_1.default.insert(schema_1.usersTable).values(formData).returning({
            id: schema_1.usersTable.id,
            email: schema_1.usersTable.email,
            fullName: schema_1.usersTable.fullName,
        });
        res.status(200).json((0, helper_1.sendResponse)("User created successfully", true, user));
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json((0, helper_1.sendResponse)("Internal server error"));
    }
});
exports.createUser = createUser;
const updateUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const formData = req.body;
        const { id } = req.params;
        if (!id) {
            res.status(400).json((0, helper_1.sendResponse)("Bad Request: Missing userId"));
            return;
        }
        const existingUser = yield db_1.default
            .select()
            .from(schema_1.usersTable)
            .where((0, drizzle_orm_1.eq)(schema_1.usersTable.id, id))
            .limit(1);
        if (!existingUser || existingUser.length === 0) {
            res.status(404).json((0, helper_1.sendResponse)(`User not found with email: ${id}`));
            return;
        }
        if (formData.email && formData.email !== existingUser[0].email) {
            const emailExists = yield db_1.default
                .select()
                .from(schema_1.usersTable)
                .where((0, drizzle_orm_1.eq)(schema_1.usersTable.email, formData.email))
                .limit(1);
            if (emailExists && emailExists.length > 0) {
                res
                    .status(400)
                    .json((0, helper_1.sendResponse)(`Email ${formData.email} already exists`));
                return;
            }
        }
        const updatedUser = yield db_1.default
            .update(schema_1.usersTable)
            .set(Object.assign(Object.assign({}, formData), { updatedAt: (0, drizzle_orm_1.sql) `CURRENT_TIMESTAMP` }))
            .where((0, drizzle_orm_1.eq)(schema_1.usersTable.id, id))
            .returning({
            id: schema_1.usersTable.id,
            email: schema_1.usersTable.email,
            fullName: schema_1.usersTable.fullName,
            updatedAt: schema_1.usersTable.updatedAt,
        });
        res
            .status(200)
            .json((0, helper_1.sendResponse)("User updated successfully", true, updatedUser));
    }
    catch (error) {
        console.error("Error updating user:", error);
        if (error.code === "22P02") {
            res.status(400).json((0, helper_1.sendResponse)("Invalid userId format"));
            return;
        }
        res.status(500).json((0, helper_1.sendResponse)("Internal server error"));
    }
});
exports.updateUserId = updateUserId;
//# sourceMappingURL=userController.js.map