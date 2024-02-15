export const userRole = {
  patient: "patient",
  doctor: "doctor",
  nurse: "nurse",
  admin: "admin",
  superAdmin: "superAdmin",
  staff: "staff",
} as const;

type TUserRole = keyof typeof userRole;

export default TUserRole;
