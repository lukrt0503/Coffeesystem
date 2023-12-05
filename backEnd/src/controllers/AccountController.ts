import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";

import { Customer } from "../models/customer";
import { Account } from "../models/account";
import { Admin } from "../models/admin";
import { User } from "../models/user";
import { EmailUtils, EmailDetails } from "../utilities/EmailUtils";
import { Constant } from "../constant";

const secretKey = "Coffee_System";

export const login = async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;
  try {
    const account = await Account.findOne({
      where: {
        username,
        password,
      },
    });
    if (account) {
      let userInfo: any; // You can define a more specific type for userInfo
      const customer = await Customer.findOne({
        where: {
          account_id: account.account_id,
        },
      });
      const admin = await Admin.findOne({
        where: {
          account_id: account.account_id,
        },
      });
      const user = await User.findOne({
        where: {
          account_id: account.account_id,
        },
      });

      if (admin) {
        userInfo = {
          id: admin.admin_id,
          profileId: account.account_id,
          role: "Admin",
          name: admin.name,
          phone: admin.phone,
          email: admin.email,
          address: admin.address,
        };
      } else if (user) {
        userInfo = {
          id: user.user_id,
          profileId: account.account_id,
          role: "User",
          name: user.coffeeShopName,
          phone: user.phone,
          email: user.email,
          address: user.address,
        };
      } else if (customer) {
        userInfo = {
          id: customer.customer_id,
          profileId: account.account_id,
          role: "Customer",
          name: customer.name,
          phone: customer.phone,
          email: customer.email,
          address: customer.address,
          age: customer.age,
        };
      } else {
        // Handle if neither customer nor admin info is found
        res.status(404).json({ message: "User not found" });
        return;
      }

      const token = jwt.sign(userInfo, secretKey);
      res.json({ token });
    } else {
      res.status(401).json({ message: "Invalid username or password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullname, username, email, phone, password, age } = req.body;
    const existingAccount = await Account.findOne({
      where: { username: username },
    });
    if (existingAccount) {
      res.status(400).json({ message: "Account already exists!" });
      return;
    }

    // Tạo tài khoản mới
    const newAccount = await Account.create({
      username,
      password,
      is_banned: false,
      forget_code: "",
    });
    // Tạo thông tin khách hàng mới
    const newCustomer = await Customer.create({
      name: fullname,
      phone,
      address: "",
      email,
      account_id: newAccount.account_id,
      avatar: "",
      age: Number(age),
    });
    res.status(200).json({
      id: newAccount.account_id,
      username: newAccount.username,
      email: newCustomer.email,
      phone: newCustomer.phone,
      age: newCustomer.age,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const forget = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.body;

    let tempCustomer;
    let tempUser;
    let accountId: number | null = null;

    // Tìm khách hàng và người dùng thông qua email
    tempCustomer = await Customer.findOne({ where: { email } });
    tempUser = await User.findOne({ where: { email } });

    if (tempCustomer || tempUser) {
      if (tempCustomer && tempUser) {
        res
          .status(400)
          .json({ message: "User somehow has 2 different profiles." });
        return;
      }

      accountId = tempCustomer
        ? tempCustomer.account_id
        : tempUser
        ? tempUser.account_id
        : null;

      if (accountId === null) {
        res.status(404).json({ message: "Could not find the given account." });
        return;
      }

      // Tạo mã xác minh
      const verificationCode = Constant.generateRandomString(10);
      //Todo
      // await Account.addForgetCode(accountId, verificationCode);
      // Save không cần thiết nếu đã sử dụng hàm addForgetCode mà không cần lưu lại

      // Gửi email
      const emailUtil = new EmailUtils(); // Chắc chắn rằng bạn đã tạo class EmailUtils và EmailDetails
      const details: EmailDetails = {
        subject: "Forget Password",
        body: `Your verification code is: ${verificationCode}\nPlease don't share it with anyone else.`,
      };
      emailUtil.sendEmail(email, details); // Chắc chắn rằng bạn đã có thông tin cấu hình email

      res.json({ accountId });
      return;
    }

    res.status(404).json({ message: "Could not find the given account." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const resetPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { accountId, password } = req.body;

    if (!password) {
      res.status(400).json({ message: "Password field is required!" });
      return;
    }
    try {
      const account = await Account.findByPk(accountId);
      if (account) {
        account.password = password;
        await account.save();
      } else {
        throw new Error("Account not found");
      }
    } catch (error) {
      throw new Error("Unable to update password");
    }
    res.status(200).json({ message: "Password updated successfully!" });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};
export const forgotPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { username, password } = req.body;

    if (!username && !password) {
      res
        .status(400)
        .json({ message: "Email and password field is required!" });
      return;
    }
    try {
      const account = await Account.findOne({ where: { username: username } });
      if (account) {
        account.password = password;
        await account.save();
      } else {
        throw new Error("Account not found");
      }
    } catch (error) {
      throw new Error("Unable to update password");
    }
    res.status(200).json({ message: "Password updated successfully!" });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

export const updateBan = async (req: Request, res: Response): Promise<void> => {
  try {
    const accountId = req.body.profileId;
    try {
      const account = await Account.findByPk(accountId);
      if (account) {
        account.is_banned = true;
        await account.save();
      } else {
        throw new Error("Account not found");
      }
    } catch (error) {
      throw new Error("Unable to update ban status");
    }
    // Bạn có thể thực hiện việc lưu cập nhật vào database ở đây nếu cần

    res.status(200).json({ message: "Ban status updated successfully!" });
  } catch (error: any) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};
