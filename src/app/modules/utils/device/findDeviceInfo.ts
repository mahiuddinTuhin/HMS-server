import { Response } from "express";

/* eslint-disable @typescript-eslint/no-var-requires */
const http = require("http");
const querystring = require("querystring");

const findDeviceInfo = async () => {
  const query = {
    access_key: process.env.DEVICE_ACCESS_KEY,
    ua: "Mozilla/5.0 (iPad; CPU OS 9_3_2 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13F69 Safari/601.1",
  };

  http.get(
    `http://api.userstack.com/detect?${querystring.stringify(query)}`,
    (response: Response) => {
      let data = "";

      response.on("data", (chunk) => (data += chunk));

      response.on("end", () => {
        const api_response = JSON.parse(data);

        console.log({ api_response });

        if (api_response.device && api_response.device.type === "tablet") {
          console.log("It's a tablet.");
        }
      });
    },
  );
};
export default findDeviceInfo;
