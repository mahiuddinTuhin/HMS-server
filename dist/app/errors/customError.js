"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode || 500;
        this.message = message || "An unexpected unknown error occured";
        Error.captureStackTrace(this, this.constructor);
        Object.setPrototypeOf(this, AppError.prototype);
    }
}
exports.default = AppError;
