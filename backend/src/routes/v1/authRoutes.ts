import express from "express";
import { stdout } from "process";
import * as userController from "../../controllers/userController";

export const authRouter = express.Router();

// User debug
authRouter.get("/users", userController.getAllUser);
authRouter.post("/users/login", userController.login)
authRouter.post("/users/sign-up", userController.signIn);
authRouter.post("/users/logout", userController.logout);