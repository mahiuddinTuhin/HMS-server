"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Staff = void 0;
const mongoose_1 = require("mongoose");
const CommonSchema_1 = require("../../schema/CommonSchema");
const staffSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: [true, "Staff id is required"],
        unique: true,
    },
    shift: {
        type: String,
        enum: ["night", "day"],
        message: "Staff's shift should be night or day!",
        required: [true, "Shift is required"],
    },
    education: [CommonSchema_1.utilsSchema.nonPatientEducationSchema],
});
exports.Staff = (0, mongoose_1.model)("Staff", staffSchema);
