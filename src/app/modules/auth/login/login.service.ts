/* eslint-disable @typescript-eslint/no-var-requires */
import { TUser } from "../../users/user.interface";
import { User } from "../../users/user.model";
import Tlogin from "./login.interface";

const login = async (payload: Tlogin) => {
  const user: TUser = await User.isUserExist(payload?.id as string);
  console.log({ user });

  const isUserAuthiticated = User.passwordMatched(
    payload?.password,
    user?.password,
  );

  return isUserAuthiticated;
};

/* check password */

const loginService = {
  login,
};
export default loginService;
