"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* catch async function */
const catchAsync = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch((err) => {
            return next(err);
        });
    };
};
exports.default = catchAsync;
