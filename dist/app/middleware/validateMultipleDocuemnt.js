"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateMultipleDocuemnt = (schema) => {
    return async (req, res, next) => {
        try {
            req?.body?.forEach(async (element) => {
                await schema.parseAsync(element);
            });
            next();
        }
        catch (error) {
            next(error);
        }
    };
};
exports.default = validateMultipleDocuemnt;
