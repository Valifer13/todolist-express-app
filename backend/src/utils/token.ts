import jwt from "jsonwebtoken";
import { refreshTokenDB } from "../data/db";

interface User {
  username: string,
  email: string
}

export const generateAccessToken = (user: User) => {
  return jwt.sign(user, process.env.ACCESS_SECRET_KEY!, { expiresIn: "1h" });
}

export const generateRefreshToken = (user: User) => {
  const refreshKey = jwt.sign(user, process.env.REFRESH_SECRET_KEY!);
  refreshTokenDB.push(refreshKey);
  return refreshKey;
}