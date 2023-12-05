import { Request, Response } from "express";
import querystring from "qs";
import crypto from "crypto";
import { format } from "date-fns";
import * as dotenv from "dotenv";
dotenv.config();
let vnpUrl = process.env.VNP_URL as string;
const tmnCode = process.env.VNP_TMNCODE;
const secretKey = process.env.VNP_HASHSECRET as string;

export const createVnpay = async (req: Request, res: Response) => {
  const { id, customerId, ticketCount, total } = req.body;
  try {
    function sortObject(obj: any) {
      let sorted: any = {};
      let str = [];
      let key;
      for (key in obj) {
        if (obj.hasOwnProperty(key)) {
          str.push(encodeURIComponent(key));
        }
      }
      str.sort();
      for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(
          /%20/g,
          "+"
        );
      }
      return sorted;
    }
    let ipAddr = "http://localhost:3076";
    const date = new Date();
    const createDate = format(date, "yyyyMMddHHmmss");
    var vnp_Params: any = {};
    vnp_Params["vnp_Version"] = "2.1.0";
    vnp_Params["vnp_Command"] = "pay";
    vnp_Params["vnp_TmnCode"] = tmnCode;
    vnp_Params["vnp_Locale"] = "vn";
    vnp_Params["vnp_CurrCode"] = "VND";
    vnp_Params["vnp_TxnRef"] = `asdasdsa2215d`;
    vnp_Params["vnp_OrderInfo"] = "Test";
    vnp_Params["vnp_OrderType"] = "topup";
    vnp_Params["vnp_Amount"] = total * 100;
    vnp_Params["vnp_ReturnUrl"] = `http://localhost:3000/event/${id}?success`;
    vnp_Params["vnp_IpAddr"] = ipAddr;
    vnp_Params["vnp_CreateDate"] = createDate;
    vnp_Params["vnp_BankCode"] = "Ncb";

    vnp_Params = sortObject(vnp_Params);
    var signData = querystring.stringify(vnp_Params, { encode: false });
    var hmac = crypto.createHmac("sha512", secretKey);
    var signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
    vnp_Params["vnp_SecureHash"] = signed;
    vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });
    return res.status(200).json({
      body: {
        id: id,
        customerId: customerId,
        ticketCount: ticketCount,
      },
      url: vnpUrl,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Something error" });
  }
};
