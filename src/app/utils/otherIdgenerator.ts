/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import AppError from "../errors/customError";

/**
 *    id: pattern
 *    Role_first_three_letter+year's last 2 digit(23)+monnth(12)+date(30)+(quantity+1)
 * @param role
 */

const findLastUser = async (Collection: any) => {
  try {
    const lastUser: any = await Collection.findOne()
      .sort({ createdAt: -1 })
      .lean();

    console.log({ lastUser });

    if (lastUser) {
      return lastUser;
    } else
      return {
        id: `${Collection?.modelName?.substring(0, 3)}000`,
      };
  } catch (error) {
    throw new AppError(
      "Failed to find last created department for generating id!",
    );
  }
};

const generateServiceId = async (Collection: any) => {
  /* finding last id on a role*/
  let lastUser;
  let lastThreeDigit: any;
  try {
    lastUser = await findLastUser(Collection);

    lastThreeDigit = lastUser?.id?.toString()?.substring(3, 6) || "000";

    let incrementedId = (Number(lastThreeDigit) + 1).toString();

    if (incrementedId?.length === 2) {
      incrementedId = `0${incrementedId}`;
    } else if (incrementedId?.length === 1) {
      incrementedId = `00${incrementedId}`;
    }
    const newId: string =
      (Collection?.modelName?.substring(0, 3) || "Custom") + incrementedId;
    return newId;
  } catch (error) {
    throw new AppError("Failed to retrieve last docuement!");
  }
};

export default generateServiceId;
