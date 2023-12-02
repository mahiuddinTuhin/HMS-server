"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.staffRouter = void 0;
const express_1 = require("express");
const staff_controller_1 = require("./staff.controller");
const router = (0, express_1.Router)();
/* creating diagnosis report */
router.post("/create-diagnosis", staff_controller_1.staffControllers.createDiagnosis);
exports.staffRouter = router;
