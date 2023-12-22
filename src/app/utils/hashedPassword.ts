/* eslint-disable @typescript-eslint/no-var-requires */

import { generatePassword } from "./randomPass";

/* eslint-disable @typescript-eslint/no-explicit-any */
const bcrypt = require("bcrypt");

const hashingPassword = async (password: string) => {
  const saltRounds = Number(process.env.SALTROUNDS) || 10;
  const salt = await bcrypt.genSaltSync(saltRounds);
  const passwordToHash = password || generatePassword();
  const hashPass = bcrypt.hashSync(passwordToHash, salt);

  return hashPass;
};
export default hashingPassword;
