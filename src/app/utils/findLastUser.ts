/* eslint-disable @typescript-eslint/no-explicit-any */

import { User } from "../modules/users/user.model";

/*
  finding last user from database, roles basis.
 */
const findLastUser = async (role: string) => {
  const lastUser: any = await User.findOne(
    { role: role.toLowerCase() },
    { id: 1, _id: 0 },
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastUser?.id;
};

export default findLastUser;
