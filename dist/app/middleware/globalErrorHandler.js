"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const zod_1 = require("zod");
const customError_1 = __importDefault(require("../errors/customError"));
const handleCastError_1 = __importDefault(require("../errors/handleCastError"));
const handleDuplicationError_1 = __importDefault(require("../errors/handleDuplicationError"));
const handleValidationError_1 = __importDefault(require("../errors/handleValidationError"));
const zodErrorHandler_1 = __importDefault(require("../errors/zodErrorHandler"));
const globalErrorHandler = (err, req, res, next) => {
    try {
        let message = err.message || "Something went wring!";
        let statusCode = err.statusCode || 500;
        // console.log({ err });
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
        else if (err?.name === "ValidationError") {
            /* handling schema validation error */
            const simplifiedErrors = (0, handleValidationError_1.default)(err);
            statusCode = simplifiedErrors?.statusCode;
            message = simplifiedErrors?.message;
            errorSources = simplifiedErrors?.errorSources;
        }
        else if (err.name === "CastError") {
            /* handling schema validation error */
            const simplifiedErrors = (0, handleCastError_1.default)(err);
            statusCode = simplifiedErrors?.statusCode;
            message = simplifiedErrors?.message;
            errorSources = simplifiedErrors?.errorSources;
        }
        else if (err?.code === 11000) {
            /* handling duplication error */
            const simplifiedErrors = (0, handleDuplicationError_1.default)(err);
            statusCode = simplifiedErrors?.statusCode;
            message = simplifiedErrors?.message;
            errorSources = simplifiedErrors?.errorSources;
        }
        else if (err instanceof customError_1.default) {
            // console.log({ insideCasting: 1, err });
            // const simplifiedErrors = handleCastError(err);
            statusCode = err?.statusCode;
            errorSources = [
                {
                    path: "",
                    // message: `${err?.error?.name}: ${err?.error?.message}` as string,
                    message: `${err?.message}`,
                },
            ];
            return res.status(statusCode).json({
                success: false,
                message,
                errors: errorSources,
            });
        }
        else if (err instanceof TypeError) {
            message = err.message;
            errorSources = [
                {
                    path: "",
                    message: err?.message,
                },
            ];
        }
        // const newObj: any = Object.values(err.error.errors);
        return res.status(statusCode).json({
            success: false,
            message,
            errors: errorSources,
        });
    }
    catch (error) {
        res.status(500).json({ err });
    }
};
exports.globalErrorHandler = globalErrorHandler;
