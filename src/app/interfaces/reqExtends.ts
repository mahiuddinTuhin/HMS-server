/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { JwtPayload } from "jsonwebtoken";
import { TUser } from "../modules/users/user.interface";

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
      fetchedUser: TUser;
    }
  }
}
