import { NextFunction, Request, Response } from "express";
import * as userModel from '../models/userModel';
import jwt from "jsonwebtoken";

export const authenticateTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res
      .status(401)
      .json({ message: "No token provided" });
    return;
  }

  const secretToken = process.env.ACCESS_SECRET_KEY!;

  try {
    const decoded = jwt.verify(token, secretToken) as { id: number };

    const user = await userModel.getUserById(decoded.id);

    if (!user) {
      res
        .status(401)
        .json({ message: "User not found" })
      return;
    }

    req.user = user;
    next()
  } catch (err) {
    res
      .status(403)
      .json({ message: "Invalid or expired token" });
    return;
  }
}

declare module 'express' {
  interface Request {
    user?: any;
  }
}