"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
const bcrypt = require("bcrypt");
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = __importDefault(require("mongoose"));
const customError_1 = __importDefault(require("../../errors/customError"));
const hashedPassword_1 = __importDefault(require("../../utils/hashedPassword"));
const Common_Validation_1 = require("../../validation/Common.Validation");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose_1.default.Schema({
    id: {
        type: String,
        required: [true, "User id is required!"],
        unique: true,
    },
    password: {
        type: String,
        default: "P@ss0rd!", //generatePassword(),
        select: 0,
        validate: {
            validator: (value) => {
                return Common_Validation_1.passwordPattern.test(value);
            },
            message: "-Password should be at least 8 characters long,\n -containing at least one uppercase letter, \n-one lowercase letter, \n-one number, \n-and one special character!",
        },
    },
    needsPasswordChange: {
        type: Boolean,
        default: true,
    },
    passwordChangedAt: { type: Date, default: null },
    email: {
        type: String,
        unique: true,
        validate: {
            validator: (value) => {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailPattern.test(value);
            },
            message: "Invalid email address format!",
        },
    },
    phone: {
        type: String,
        // validate: {
        //   validator: function (value: string) {
        //     return phonePattern.test(value);
        //   },
        //   message: "Invalid phone address format!",
        // },
    },
    role: {
        type: String,
        required: [true, "Role is required!"],
        enum: ["patient", "doctor", "admin", "nurse", "staff"],
        message: "{VALUES} is not correct role. Choose patient, doctor, admin, nurse or staff as role",
    },
    status: {
        type: String,
        default: "active",
        enum: {
            values: ["active", "deactive"],
            message: "{VALUES} is not correct role. Choose active or inactive as status",
        },
    },
    failed_login_attempts: {
        type: Number,
        default: 0,
    },
    last_login: {
        type: String,
    },
    last_failed_login: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
/**
 *  @Pre_hook
 *
 * @hash_the_pass_before_saving
 */
userSchema.pre("save", async function (next) {
    try {
        // const saltRounds = Number(process.env.SALTROUNDS) || 10;
        // const salt = await bcrypt.genSaltSync(saltRounds);
        // const passwordToHash = this?.password || generatePassword();
        // const hashPass = bcrypt.hashSync(passwordToHash, salt);
        // this.password = hashPass;
        this.password = await (0, hashedPassword_1.default)(this.password);
        next();
    }
    catch (error) {
        next(error);
    }
});
/**
 * @hiding_the_password
 */
// userSchema.post("save", function (doc, next) {
//   doc.password = "";
//   next();
// });
/* password Matching static method */
/*
 * passwordMatched
 */
userSchema.statics.passwordMatched = async function (plainTextPassword, hasedPassword) {
    // console.log({ plainTextPassword, hasedPassword });
    return await bcrypt.compare(plainTextPassword, hasedPassword);
};
/* user existance checking static method */
/*
 * isUserExist
 */
userSchema.static("isUserExist", async function isUserExist(id) {
    /* query in database */
    const user = await exports.User.findOne({
        $or: [{ id: id }, { email: id }],
    }).select("+password");
    /* if user not match by id or email */
    if (!user) {
        throw new customError_1.default("User not found. User correct id or email!", http_status_1.default.NOT_FOUND);
    }
    /* if id deactivate */
    if (user.status === "deactive") {
        throw new customError_1.default("This user has been deactivate. Contact with administration!", http_status_1.default.FORBIDDEN);
    }
    /* if id deactivate */
    if (user.isDeleted === true) {
        throw new customError_1.default("This user has been deleted. Contact with administration!", http_status_1.default.FORBIDDEN);
    }
    return user;
});
/*
 * user accessToken creation method
 */
userSchema.static("createToken", async function createToken(payload, secret, exp) {
    /* creating signature by json webtoken */
    try {
        const accessToken = await jwt.sign(payload, secret, {
            expiresIn: exp,
        });
        // console.log({ accessToken });
        return accessToken;
    }
    catch (error) {
        throw new customError_1.default(error?.message, 400);
    }
});
exports.User = mongoose_1.default.model("User", userSchema);
