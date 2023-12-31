"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* this function will organize each error message and will return */
const handledZodError = (err) => {
    const statusCode = 400;
    /* it will have an array of string */
    const errorSources = err.issues.map((issue) => {
        return {
            path: issue?.path,
            message: issue?.message,
        };
    });
    return {
        statusCode,
        message: "Validation error!",
        errorSources,
    };
};
exports.default = handledZodError;
