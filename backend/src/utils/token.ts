import jwt from "jsonwebtoken";

interface User {
  id: number,
  username: string,
  email: string,
}

export const generateAccessToken = (user: User) => {
  return jwt.sign(user, process.env.ACCESS_SECRET_KEY!, { expiresIn: "1h" });
}

export const generateRefreshToken = (user: User) => {
  return jwt.sign(user, process.env.REFRESH_SECRET_KEY!, { expiresIn: "1d" });
}