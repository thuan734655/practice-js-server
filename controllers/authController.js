import authService from "../services/authService.js";
import createResponse from "../services/createResponse.js";

class AuthController {
  static async login(req, res) {
    const { email, password } = req.body;
    const result = await authService.checkAccount(email, password);
    const { success, message, data, status } = result;
    if (success) {
      const { idUser } = data;
      res.cookie("idUser", idUser, {
        maxAge: 86400000, // 1 day
        path: "/",
        sameSite: "None",
        secure: true,
      });
    }

    return res.status(status).json(createResponse(success, message, { data }));
  }

  static async register(req, res) {
    const { email, password, fullname } = req.body;
    const result = await authService.register(email, password, fullname);
    const { success, message, data, status } = result;

    return res.status(status).json(createResponse(success, message, { data }));
  }
}

export default AuthController;
