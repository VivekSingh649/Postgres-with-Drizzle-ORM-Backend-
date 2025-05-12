"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.UserSchema = zod_1.default.object({
    fullName: zod_1.default.string({ required_error: "Full name is required." }),
    age: zod_1.default
        .number({ required_error: "Age is required." })
        .min(0, { message: "Age must be a positive number." }),
    email: zod_1.default
        .string({ required_error: "Email address is required." })
        .email({ message: "Invalid email address." }),
    phone: zod_1.default
        .string({ required_error: "Phone number is required." })
        .min(10, { message: "Phone number must be atleast 10 characters" })
        .max(15, { message: "Phone number must be 15 or fewer characters long" }),
    isActive: zod_1.default.boolean().default(false),
    gender: zod_1.default.string({ required_error: "Gender is required" }).trim(),
    address: zod_1.default.object({
        street: zod_1.default.string().optional(),
        city: zod_1.default.string({ required_error: "City is required." }),
        state: zod_1.default.string({ required_error: "State is required." }),
        zip: zod_1.default.string({ required_error: "ZIP code is required." })
            .regex(/^\d{6}$/, { message: "Invalid ZIP code format." }),
        country: zod_1.default.string({ required_error: "Country is required." }),
    }),
    preferences: zod_1.default.object({
        language: zod_1.default.string({ required_error: "Language preference is required." }),
        newsletterSubscribed: zod_1.default.boolean().optional(),
        darkMode: zod_1.default.boolean().optional()
    }),
    hobbies: zod_1.default
        .array(zod_1.default.string())
        .min(1, { message: "At least one hobby is required." }),
    education: zod_1.default
        .array(zod_1.default.object({
        degree: zod_1.default.string({ required_error: "Degree is required." }),
        stream: zod_1.default.string({ required_error: "Stream is required." }),
        year: zod_1.default
            .number({ required_error: "Year is required." })
            .min(1900, { message: "Year must be valid." }),
        institute: zod_1.default.string({ required_error: "Institute is required." }),
    }))
        .min(1, { message: "At least one education entry is required." }),
    socialProfiles: zod_1.default.object({
        linkedIn: zod_1.default
            .string({ required_error: "LinkedIn URL is required." })
            .url({ message: "Invalid LinkedIn URL." }),
        github: zod_1.default
            .string({ required_error: "GitHub URL is required." })
            .url({ message: "Invalid GitHub URL." }),
        twitter: zod_1.default
            .string({ required_error: "Twitter URL is required." })
            .url({ message: "Invalid Twitter URL." }),
    }),
});
//# sourceMappingURL=userValidator.js.map