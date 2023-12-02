"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRoutes = void 0;
const express_1 = require("express");
const admin_controllers_1 = require("./admin.controllers");
const router = (0, express_1.Router)();
/* creating department routes */
router.post("/create-department", admin_controllers_1.adminController.createDepartment);
/* creating labratory routes */
router.post("/create-labratory", admin_controllers_1.adminController.createLabratory);
exports.adminRoutes = router;
