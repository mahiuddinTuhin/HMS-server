"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFound = (err, req, res) => {
    // Handle errors here and send a response
    res.status(500).send("Internal Server Error");
};
exports.default = notFound;
