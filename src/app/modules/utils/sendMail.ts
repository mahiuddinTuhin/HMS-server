/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import nodemailer from "nodemailer";
import AppError from "../../errors/customError";
const fs = require("fs");
const util = require("util");

const readFile = util.promisify(fs.readFile);
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: process.env.NODE_ENV === "production" || false,
  auth: {
    user: "mahiuddiinntuhin@gmail.com",
    pass: "xwnp vxpf qwjx iroc", //xwnp vxpf qwjx iroc
  },
});

const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    const htmlContent = await readFile(
      "src/app/modules/utils/forgetPasswordTemplate.html",
    );

    await transporter.sendMail({
      from: "mahiuddiinntuhin@gmail.com", // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html: htmlContent, // html body
    });
  } catch (error: any) {
    throw new AppError(error?.message, 400);
  }
};

export default sendEmail;
