import { eq, sql } from "drizzle-orm";
import db from "../config/db";
import { usersTable } from "../drizzle/schema";
import { Request, Response } from "express";
import { sendResponse } from "../helper/helper";

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
}

export const getAllUsers = async (
    req: Request,
    res: Response
): Promise<any> => {
    try {
        const users = await db.select().from(usersTable);
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
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            data: null,
        });
    }
};

export const getUserById = async (
    req: Request,
    res: Response
): Promise<any> => {
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
        const user = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.id, id))
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
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            data: null,
        });
    }
};

export const deleteUserById = async (
    req: Request,
    res: Response
): Promise<any> => {
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
        const user = await db
            .delete(usersTable)
            .where(eq(usersTable.id, id))
            .returning({
                id: usersTable.id,
                userName: usersTable.fullName,
                email: usersTable.email,
            });
        res.status(200).json({
            success: true,
            message: "User delete successfully",
            data: user,
        });
    } catch (error) {
        console.error("Error deleting users:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            data: null,
        });
    }
};

export const createUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const formData = req.body;
        const { email } = formData;

        const isUser = await db
            .select({ email: usersTable.email })
            .from(usersTable)
            .where(eq(usersTable.email, email));

        if (isUser.length > 0) {
            return res.status(400).json(sendResponse(`${email} already exists`));
        }

        const user = await db.insert(usersTable).values(formData).returning({
            id: usersTable.id,
            email: usersTable.email,
            fullName: usersTable.fullName,
        });

        res.status(200).json(sendResponse("User created successfully", true, user));
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json(sendResponse("Internal server error"));
    }
};

export const updateUserId = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const formData = req.body;
        const { id } = req.params;

        if (!id) {
            res.status(400).json(sendResponse("Bad Request: Missing userId"));
            return;
        }

        const existingUser = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.id, id))
            .limit(1);

        if (!existingUser || existingUser.length === 0) {
            res.status(404).json(sendResponse(`User not found with email: ${id}`));
            return;
        }

        if (formData.email && formData.email !== existingUser[0].email) {
            const emailExists = await db
                .select()
                .from(usersTable)
                .where(eq(usersTable.email, formData.email))
                .limit(1);

            if (emailExists && emailExists.length > 0) {
                res
                    .status(400)
                    .json(sendResponse(`Email ${formData.email} already exists`));
                return;
            }
        }

        const updatedUser = await db
            .update(usersTable)
            .set({
                ...formData,
                updatedAt: Date.now(),
            })
            .where(eq(usersTable.id, id))
            .returning({
                id: usersTable.id,
                email: usersTable.email,
                fullName: usersTable.fullName,
                updatedAt: usersTable.updatedAt,
            });

        res
            .status(200)
            .json(sendResponse("User updated successfully", true, updatedUser));
    } catch (error) {
        console.error("Error updating user:", error);
        if ((error as any).code === "22P02") {
            res.status(400).json(sendResponse("Invalid userId format"));
            return;
        }
        res.status(500).json(sendResponse("Internal server error"));
    }
};
