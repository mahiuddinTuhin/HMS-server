"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFound = (err, req, res, next) => {
    console.error("Global Error Handler:", err);
    res.status(500).json({ error: "Internal Server Error" });
};
exports.default = notFound;
