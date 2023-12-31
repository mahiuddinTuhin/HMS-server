"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../modules/users/user.model");
/*
  finding last user from database, roles basis.
 */
const findLastUser = async (role) => {
    const lastUser = await user_model_1.User.findOne({ role: role.toLowerCase() }, { id: 1, _id: 0 })
        .sort({ createdAt: -1 })
        .lean();
    return lastUser?.id;
};
exports.default = findLastUser;
