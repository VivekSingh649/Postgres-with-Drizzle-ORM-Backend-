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
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaValidate = void 0;
const zod_1 = require("zod");
const schemaValidate = (schema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield schema.parseAsync(req.body);
        return next();
    }
    catch (error) {
        console.error("Validation error:", error);
        if (error instanceof zod_1.ZodError) {
            const errorMessages = error.errors.map((issue) => {
                return {
                    message: issue.message,
                    path: issue.path.at(-1)
                };
            });
            res.status(400).json({ success: false, data: null, error: errorMessages });
        }
        else {
            res.status(501).json({ error: 'Internal Server Error' });
        }
    }
});
exports.schemaValidate = schemaValidate;
//# sourceMappingURL=validationMiddleware.js.map