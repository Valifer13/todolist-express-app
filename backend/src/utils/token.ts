import jwt from "jsonwebtoken";
import crypto from 'crypto';

export const generateAccessToken = (data: any) => {
  return jwt.sign(data, process.env.ACCESS_SECRET_KEY!, { expiresIn: "1h" });
}

export const generateRefreshToken = () => {
  return crypto.randomUUID();
}