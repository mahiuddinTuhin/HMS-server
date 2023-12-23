/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import nodemailer from "nodemailer";
import AppError from "../../errors/customError";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: process.env.NODE_ENV === "production" || false,
  auth: {
    user: process.env.MAIL,
    pass: process.env.SMPT_MAIL_PASS,
  },
});

const sendEmail = async (to: string, subject: string, text: string) => {
  try {
    await transporter.sendMail({
      from: process.env.MAIL, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html: `<b>${text}</b>`, // html body
    });
  } catch (error: any) {
    throw new AppError(error?.message, 400);
  }
};

export default sendEmail;
