/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import { User } from "../../users/user.model";
import Tlogin from "./login.interface";

const login = async (payload: Tlogin) => {
  const user = await User.isUserExist(payload?.id as string);

  const isUserAuthiticated = User.passwordMatched(
    payload?.password,
    user?.password,
  );

  if (isUserAuthiticated) {
    console.log({ isUserAuthiticated });
    const accessToken = await User.accessTokenCreation({
      id: user?.id,
      role: user?.role,
    });
    return { accessToken, needsPasswordChange: user?.needsPasswordChange };
  }
};

/* check password */

const loginService = {
  login,
};
export default loginService;
