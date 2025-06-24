import jwt from "jsonwebtoken";
import crypto from 'crypto';

/**
 * Generate access token from specified data.
 * @param data Json object.
 * @returns The JWT token for access.
 */
export const generateAccessToken = (data: any) => {
  return jwt.sign(data, process.env.ACCESS_SECRET_KEY!, { expiresIn: "1h" });
}

/**
 * Generate refresh token with uuid.
 * @returns The UUID refresh token.
 */
export const generateRefreshToken = () => {
  return crypto.randomUUID();
}