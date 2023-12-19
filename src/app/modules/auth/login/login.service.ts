/* eslint-disable @typescript-eslint/no-var-requires */
import { User } from "../../users/user.model";
import Tlogin from "./login.interface";


const login = async (payload: Tlogin) => {
  const isUserAuthiticated = await User.checkingUserExistance(payload);
  return isUserAuthiticated;
};

/* check password */

const loginService = {
  login,
};
export default loginService;
