"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_routes_1 = require("../modules/admin/admin.routes");
const auth_routes_1 = __importDefault(require("../modules/auth/auth.routes"));
const department_routes_1 = __importDefault(require("../modules/department/department.routes"));
const doctors_routes_1 = require("../modules/doctors/doctors.routes");
const patient_routes_1 = require("../modules/patients/patient.routes");
const staff_routes_1 = require("../modules/staff/staff.routes");
const user_routes_1 = require("../modules/users/user.routes");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/users",
        route: user_routes_1.userRoutes,
    },
    {
        path: "/doctors",
        route: doctors_routes_1.doctorRoutes,
    },
    {
        path: "/admin",
        route: admin_routes_1.adminRoutes,
    },
    {
        path: "/patient",
        route: patient_routes_1.patientRoutes,
    },
    {
        path: "/staff",
        route: staff_routes_1.staffRoutes,
    },
    {
        path: "/department",
        route: department_routes_1.default,
    },
    {
        path: "/auth",
        route: auth_routes_1.default,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
