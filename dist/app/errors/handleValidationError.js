"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const handleValidationError = (err) => {
    const message = Object.values(err.errors).map((err) => {
        if (err instanceof mongoose_1.Error.CastError) {
            return {
                path: err.path,
                message: `'${err.value}' is not accectable as ${err.path}. Please Enter a ${err.kind} type value.`,
            };
        }
        return {
            path: err.path,
            message: err.message,
        };
    });
    // const statusCode = 400;
    return {
        statusCode: 400,
        message: "Validation error!",
        errorSources: message,
    };
};
exports.default = handleValidationError;
