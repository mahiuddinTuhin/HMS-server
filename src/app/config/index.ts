import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join((process.cwd(), ".env")) });

export default {
  PORT: process.env.PORT,
  DB_URL_ATLAS: process.env.ATLAS,
  DB_URL_COMPASS: process.env.COMPASS,
  JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET,
  JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET,
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN,
  RESET_PASSWORD_UI_LINK: process.env.RESET_PASSWORD_UI_LINK,
  // #: process.env.#,
  MAIL: process.env.MAIL,
  SMPT_MAIL_PASS: process.env.SMPT_MAIL_PASS,
  SALTROUNDS: process.env.SALTROUNDS,
  NODE_ENV: process.env.NODE_ENV,
  // #: process.env.#,
  CLOUD_NAME: process.env.CLOUD_NAME,
  API_KEY: process.env.API_KEY,
  API_SECRET: process.env.API_SECRET,
  CLOUDINARY_URL: process.env.CLOUDINARY_URL,
  DEFAULT_PASSWORD: process.env.DEFAULT_PASSWORD,
};
