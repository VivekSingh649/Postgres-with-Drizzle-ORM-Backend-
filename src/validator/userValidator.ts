import z from "zod";

export const UserSchema = z.object({
    fullName: z.string({ required_error: "Full name is required." }),
    age: z
        .number({ required_error: "Age is required." })
        .min(0, { message: "Age must be a positive number." }),
    email: z
        .string({ required_error: "Email address is required." })
        .email({ message: "Invalid email address." }),
    phone: z
        .string({ required_error: "Phone number is required." })
        .min(10, { message: "Phone number must be atleast 10 characters" })
        .max(15, { message: "Phone number must be 15 or fewer characters long" }),
    isActive: z.boolean().default(false),
    gender: z.string({ required_error: "Gender is required" }).trim(),
    address: z.object({
        street: z.string().optional(),
        city: z.string({ required_error: "City is required." }),
        state: z.string({ required_error: "State is required." }),
        zip: z.string({ required_error: "ZIP code is required." })
            .regex(/^\d{6}$/, { message: "Invalid ZIP code format." }),
        country: z.string({ required_error: "Country is required." }),
    }),
    preferences: z.object({
        language: z.string({ required_error: "Language preference is required." }),
        newsletterSubscribed: z.boolean().optional(),
        darkMode: z.boolean().optional()
    }),
    hobbies: z
        .array(z.string())
        .min(1, { message: "At least one hobby is required." }),
    education: z
        .array(
            z.object({
                degree: z.string({ required_error: "Degree is required." }),
                stream: z.string({ required_error: "Stream is required." }),
                year: z
                    .number({ required_error: "Year is required." })
                    .min(1900, { message: "Year must be valid." }),
                institute: z.string({ required_error: "Institute is required." }),
            })
        )
        .min(1, { message: "At least one education entry is required." }),
    socialProfiles: z.object({
        linkedIn: z
            .string({ required_error: "LinkedIn URL is required." })
            .url({ message: "Invalid LinkedIn URL." }),
        github: z
            .string({ required_error: "GitHub URL is required." })
            .url({ message: "Invalid GitHub URL." }),
        twitter: z
            .string({ required_error: "Twitter URL is required." })
            .url({ message: "Invalid Twitter URL." }),
    }),
});
