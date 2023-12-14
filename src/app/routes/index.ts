import { Router } from "express";
import { adminRoutes } from "../modules/admin/admin.routes";
import departmentRouter from "../modules/department/department.routes";
import { doctorRoutes } from "../modules/doctors/doctors.routes";
import { patientRoutes } from "../modules/patients/patient.routes";
import { staffRoutes } from "../modules/staff/staff.routes";
import { userRoutes } from "../modules/users/user.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/doctors",
    route: doctorRoutes,
  },
  {
    path: "/admin",
    route: adminRoutes,
  },
  {
    path: "/patient",
    route: patientRoutes,
  },
  {
    path: "/staff",
    route: staffRoutes,
  },
  {
    path: "/department",
    route: departmentRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
