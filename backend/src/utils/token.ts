import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';
import crypto from 'crypto';

interface User {
  id: number,
  username: string,
  email: string,
}

export const generateAccessToken = (user: User) => {
  return jwt.sign(user, process.env.ACCESS_SECRET_KEY!, { expiresIn: "1h" });
}

export const generateRefreshToken = () => {
  return crypto.randomUUID();
}