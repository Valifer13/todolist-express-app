import express from "express";
import * as userController from "../../controllers/userController";
import * as authController from "../../controllers/authController";

export const authRouter = express.Router();

// User debug
authRouter.get("/users", userController.getAllUser);
authRouter.post("/users", authController.signIn);
authRouter.post("/users/login", authController.login)
authRouter.post("/users/logout", authController.logout);