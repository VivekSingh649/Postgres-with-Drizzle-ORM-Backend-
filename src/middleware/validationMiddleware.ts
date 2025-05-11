import { NextFunction, Request, RequestHandler, Response } from "express";
import { AnyZodObject, ZodError } from "zod";

export const schemaValidate =
    (schema: AnyZodObject): RequestHandler =>
        async (req: Request, res: Response, next: NextFunction) => {
            try {
                await schema.parseAsync(req.body);
                return next();
            } catch (error) {
                console.error("Validation error:", error);
                if (error instanceof ZodError) {
                    const errorMessages = error.errors.map((issue: any) => {
                        return {
                            message: issue.message,
                            path: issue.path.at(-1)
                        }
                    })
                    res.status(400).json({ success: false, data: null, error: errorMessages });
                } else {
                    res.status(501).json({ error: 'Internal Server Error' });
                }
            }
        };
