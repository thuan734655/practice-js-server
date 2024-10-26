import express from "express";
import AuthController from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/login", AuthController.login);
authRouter.post("/register", AuthController.register);

export default authRouter;
