"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const globalErrorHandler = (err, req, res, next) => {
    const message = err.message || "Something went wring!";
    res.status(400).json({ success: false, message, error: err });
};
exports.globalErrorHandler = globalErrorHandler;
