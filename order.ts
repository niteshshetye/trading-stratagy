import request from "request";
import crypto from "crypto";
import { BaseURL, apiEndPoint } from "./api.config";
import { defaultConfig } from "./default.config";

const LIMIT_ORDER = "limit_order";
const HASH = "sha256";
const DIGEST = "hex";

// Place your API key and secret below. You can generate it from the website.

export const createOrder = (
  side: "buy" | "sell",
  market: string,
  price: number,
  quantity: number,
  clientOrderId: string
) => {
  return new Promise<void>((resolve) => {
    const body = {
      side,
      order_type: LIMIT_ORDER,
      market,
      price_per_unit: price,
      total_quantity: quantity,
      timestamp: Math.floor(Date.now()),
      client_order_id: clientOrderId,
    };

    const payload = new Buffer(JSON.stringify(body)).toString();
    const signature = crypto
      .createHmac(HASH, defaultConfig.secret)
      .update(payload)
      .digest(DIGEST);

    const options = {
      url: `${BaseURL.apiCoindcx}${apiEndPoint.createOrder}`,
      headers: {
        "X-AUTH-APIKEY": defaultConfig.key,
        "X-AUTH-SIGNATURE": signature,
      },
      json: true,
      body: body,
    };

    request.post(options, function (error: any, response: any, body: any) {
      if (error) {
        console.error("error: ", error);
      } else {
        console.log({ response, body });
        resolve();
      }
    });
  });
};

export const cancelOrder = () => {};

export const cancelAll = (market: string) => {
  return new Promise<void>((resolve) => {
    const body = {
      market,
      timestamp: Math.floor(Date.now()),
    };

    const payload = new Buffer(JSON.stringify(body)).toString();
    const signature = crypto
      .createHmac("sha256", defaultConfig.secret)
      .update(payload)
      .digest("hex");

    const options = {
      url: `${BaseURL.apiCoindcx}${apiEndPoint.cancelAllOrder}`,
      headers: {
        "X-AUTH-APIKEY": defaultConfig.key,
        "X-AUTH-SIGNATURE": signature,
      },
      json: true,
      body: body,
    };

    request.post(options, function (error, response, body) {
      if (error) {
        console.error("error: ", error);
      } else {
        console.log({ body, response });
        resolve();
      }
    });
  });
};
