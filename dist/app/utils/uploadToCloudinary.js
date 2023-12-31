"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
const cloudinary_1 = require("cloudinary");
const multer_1 = __importDefault(require("multer"));
const customError_1 = __importDefault(require("../errors/customError"));
const fs = require("fs");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
const uploadToCloudinary = (path, imageName) => {
    return new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader.upload(path, //local image path
        { public_id: imageName }, function (error, result) {
            if (error) {
                reject(error);
            }
            resolve(result);
            // removing image file from 'path' of image
            fs.unlink(path, (err) => {
                if (err) {
                    throw new customError_1.default("Error in deleting file after uploads", 400);
                }
                // else {
                //   console.log("File is deleted.");
                // }
            });
        });
    });
};
exports.default = uploadToCloudinary;
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.cwd() + "/uploads/");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix);
    },
});
exports.upload = (0, multer_1.default)({ storage: storage });
