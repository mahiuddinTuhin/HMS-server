"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_routes_1 = require("../modules/admin/admin.routes");
const doctors_routes_1 = require("../modules/doctors/doctors.routes");
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
        path: "/staff",
        route: staff_routes_1.staffRouter,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
