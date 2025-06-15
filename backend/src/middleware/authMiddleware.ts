import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authenticateTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res
      .status(401)
      .json({ message: "No token provided" });
    return;
  }

  const secretToken = process.env.ACCESS_SECRET_KEY!;

  jwt.verify(token, secretToken, (err, user) => {
    if (err) {
      res
        .status(403)
        .json({ message: "Invalid token" });
      return
    }

    req.user = user;
    next();
  })
}

declare module 'express' {
  interface Request {
    user?: any;
  }
}