/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { User } from "../../modules/users/user.model";

/**
 *    id: pattern
 *    Role_first_three_letter+year's last 2 digit(23)+monnth(12)+date(30)+(quantity+1)
 * @param role
 */

const findLastUser = async (role: string) => {
  const lastUser: any = await User.findOne({ role }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();

  return lastUser;
};

export const generateId = async (role: string) => {
  const date = new Date();
  const currentYear = date.getFullYear().toString().substring(2, 4);
  const currentMonth = (date.getMonth() + 1).toString();
  const newMonth = currentMonth.length < 2 ? `0${currentMonth}` : currentMonth;
  const currentDateStr = date.getDate().toString();
  const newDate =
    currentDateStr.length < 2 ? `0${currentDateStr}` : currentDateStr;

  /* finding last id on a role*/
  let lastUser;
  let lastThreeDigit: any;
  try {
    lastUser = (await findLastUser(role)) || { id: "" };
    const id = lastUser.id.toString();
    const lastUserDate = id.substring(3, 5);

    lastThreeDigit = id.substring(9, 12);

    if (
      lastUserDate === newDate &&
      lastThreeDigit &&
      Number(lastThreeDigit) < 1000
    ) {
      lastThreeDigit = (Number(lastThreeDigit) + 1).toString();
    } else {
      lastThreeDigit = "001";
    }
  } catch (error) {
    // console.log(null);
  }

  if (lastThreeDigit.toString().length === 2) {
    lastThreeDigit = `0${lastThreeDigit}`;
  } else if (lastThreeDigit.toString().length === 1) {
    lastThreeDigit = `00${lastThreeDigit}`;
  }
  const newId: string =
    (role.substring(0, 3) || "Guest") +
    newDate +
    newMonth +
    currentYear +
    lastThreeDigit;

  return newId;
};
