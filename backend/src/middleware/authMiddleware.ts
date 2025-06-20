import { NextFunction, Request, Response } from "express";
import * as userModel from "../models/userModel";
import jwt from "jsonwebtoken";
import { sendResponse } from "../utils/response";

export const authenticateTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    sendResponse(res, 401, {
      success: false,
      message: "No token provided",
    });
    return;
  }

  const secretToken = process.env.ACCESS_SECRET_KEY!;

  try {
    const decoded = jwt.verify(token, secretToken) as { id: number };

    const user = await userModel.getUserById(decoded.id);

    if (!user) {
      sendResponse(res, 401, {
        success: false,
        message: "User not found",
      });
      return;
    }

    req.user = user;
    next();
  } catch (err) {
    sendResponse(res, 401, {
      success: false,
      message: "Invalid or expired token",
    });
    return;
  }
};

declare module "express" {
  interface Request {
    user?: any;
  }
}
