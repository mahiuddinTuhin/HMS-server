"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Staff = void 0;
const mongoose_1 = require("mongoose");
const staffSchema = new mongoose_1.Schema({
    userId: String,
    user_id: { type: mongoose_1.Schema.Types.ObjectId, required: true },
    role: String,
    schedule: [String],
    contactInfo: [String],
    education: [String],
    date_of_birth: String,
    gender: String,
    needs_password_change: Boolean,
});
exports.Staff = (0, mongoose_1.model)("Staff", staffSchema);
