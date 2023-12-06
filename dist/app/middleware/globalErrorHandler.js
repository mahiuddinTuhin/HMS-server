"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const handleValidationError_1 = __importDefault(require("../errors/handleValidationError"));
const customError_1 = __importDefault(require("../util/customError"));
const zodErrorHandler_1 = __importDefault(require("../util/zodErrorHandler"));
const globalErrorHandler = (err, req, res, next) => {
    let message = err.message || "Something went wring!";
    let statusCode = err.statusCode || 500;
    let errorSources = [
        {
            path: "",
            message: "Something went wrong",
        },
    ];
    /* handling zod validation error  */
    if (err instanceof zod_1.ZodError) {
        const simplifiedErrors = (0, zodErrorHandler_1.default)(err);
        statusCode = simplifiedErrors?.statusCode;
        message = simplifiedErrors?.message;
        errorSources = simplifiedErrors?.errorSources;
    }
    else if (err instanceof mongoose_1.Error.ValidationError) {
        /* handling schema validation error */
        const simplifiedErrors = (0, handleValidationError_1.default)(err);
        statusCode = simplifiedErrors?.statusCode;
        message = simplifiedErrors?.message;
        errorSources = simplifiedErrors?.errorSources;
    }
    else if (err.code === 11000) {
        /* handling duplicate error comes from mongodb index */
        statusCode = 409;
        const firstKey = Object.keys(err.keyValue)[0];
        const value = err.keyValue[firstKey];
        message = `Duplication occurs!`;
        errorSources[0].message = `'${value}' is already created in ${firstKey}`;
        errorSources[0].path = `${firstKey}`;
    }
    else if (err instanceof customError_1.default) {
        /* handling AppError class message */
        message = err.message;
        errorSources[0].message = err.message;
        errorSources[0].path = "";
    }
    return res
        .status(statusCode)
        .json({ success: false, message, errors: errorSources });
};
exports.globalErrorHandler = globalErrorHandler;
