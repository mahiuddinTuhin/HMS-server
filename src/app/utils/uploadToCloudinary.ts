/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import config from "../config";
import AppError from "../errors/customError";
const fs = require("fs");

cloudinary.config({
  cloud_name: config.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadToCloudinary = (path: string, imageName: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path, //local image path
      { public_id: imageName },
      function (error, result) {
        if (error) {
          reject(error);
        }
        resolve(result);

        // removing image file from 'path' of image
        fs.unlink(path, (err: any) => {
          if (err) {
            throw new AppError("Error in deleting file after uploads", 400);
          }
          // else {
          //   console.log("File is deleted.");
          // }
        });
      },
    );
  });
};

export default uploadToCloudinary;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
