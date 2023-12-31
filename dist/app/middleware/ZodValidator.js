"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateRequest = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.parseAsync({
                body: req.body,
                cookies: req.cookies,
            });
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
exports.default = validateRequest;
