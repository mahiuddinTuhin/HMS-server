"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseToRequest = exports.ResponseToServer = void 0;
const ResponseToServer = (
// eslint-disable-next-line @typescript-eslint/no-unused-vars
req, res, success, status, message, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
data) => {
    return res.status(status).json({
        success,
        status,
        message,
        data,
    });
};
exports.ResponseToServer = ResponseToServer;
const responseToRequest = (res, data) => {
    return res.status(data?.status).json({
        success: data?.success,
        message: data?.message,
        data: data?.data,
    });
};
exports.responseToRequest = responseToRequest;
