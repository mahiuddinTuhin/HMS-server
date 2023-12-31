"use strict";
/* eslint-disable @typescript-eslint/no-var-requires */
Object.defineProperty(exports, "__esModule", { value: true });
const randomPass_1 = require("./randomPass");
/* eslint-disable @typescript-eslint/no-explicit-any */
const bcrypt = require("bcrypt");
const hashingPassword = async (password) => {
    const saltRounds = Number(process.env.SALTROUNDS) || 10;
    const salt = await bcrypt.genSaltSync(saltRounds);
    const passwordToHash = password || (0, randomPass_1.generatePassword)();
    const hashPass = bcrypt.hashSync(passwordToHash, salt);
    return hashPass;
};
exports.default = hashingPassword;
