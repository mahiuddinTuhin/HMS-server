"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
const nodemailer_1 = __importDefault(require("nodemailer"));
const customError_1 = __importDefault(require("../../errors/customError"));
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: process.env.NODE_ENV === "production" || false,
    auth: {
        user: process.env.MAIL,
        pass: process.env.SMPT_MAIL_PASS,
    },
});
const sendEmail = async (to, subject, text) => {
    try {
        await transporter.sendMail({
            from: process.env.MAIL, // sender address
            to, // list of receivers
            subject, // Subject line
            text, // plain text body
            html: `<b>${text}</b>`, // html body
        });
    }
    catch (error) {
        throw new customError_1.default(error?.message, 400);
    }
};
exports.default = sendEmail;
