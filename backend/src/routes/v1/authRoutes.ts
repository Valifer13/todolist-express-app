import express from "express";
import * as userController from "../../controllers/userController";
import * as authController from "../../controllers/authController";
import { body } from "express-validator";

export const authRouter = express.Router();

// User debug
authRouter.get("/users", userController.getAllUser);

authRouter.post(
  "/users/register", 
  [
    body("username").notEmpty().withMessage("Username can't be empty"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password").custom(value => {
      if (value.length < 8) {
        throw new Error("Password must at least 8 character");
      }
      return true;
    }),
    body("passwordConfirm").custom((value, { req }) => {
      return value === req.body.password;
    }).withMessage("Password confirmation doesn't match with password"),
  ], 
  authController.register
);

authRouter.post(
  "/users/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password").notEmpty().withMessage("Password can't empty")
  ],
  authController.login
);

authRouter.post(
  "/users/logout",
  [
    body("email").isEmail().withMessage("Invalid email"),
  ],
  authController.logout
);