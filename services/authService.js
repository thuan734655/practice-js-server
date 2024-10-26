import e from "express";
import connectDB from "../config/connectDB.js";

const authService = {
  async checkAccount(email, password) {
    if (!email || !password) {
      return {
        success: false,
        message: "Data invalid",
        data: null,
        status: 400,
      };
    }

    try {
      const [result] = await connectDB.query(
        "SELECT idUser FROM `account` WHERE email = ? and password = ?",
        [email, password]
      );

      if (result.length === 0) {
        return {
          success: false,
          message: "Account not found",
          data: null,
          status: 404,
        };
      }

      return {
        success: true,
        message: "Login successful",
        data: { idUser: result[0].idUser },
        status: 200,
      };
    } catch (err) {
      return {
        success: false,
        message: "Query error",
        data: null,
        status: 500,
      };
    }
  },

  async register(email, password, fullname) {
    console.log(!fullname);
    if (!email || !password || !fullname) {
      return {
        success: false,
        message: "Data invalid",
        data: null,
        status: 400,
      };
    }

    try {
      const [res] = await connectDB.query(
        "INSERT INTO `account`(`email`, `password`, `fullname`) VALUES (?, ?, ?)",
        [email, password, fullname]
      );

      if (res.affectedRows > 0) {
        return {
          success: true,
          message: "Register successful",
          data: { idUser: res.insertId },
          status: 201,
        };
      } else {
        return {
          success: false,
          message: "Register failed",
          data: null,
          status: 500,
        };
      }
    } catch (err) {
      return {
        success: false,
        message: "Query error",
        data: null,
        status: 500,
      };
    }
  },
};

export default authService;
