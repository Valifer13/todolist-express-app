import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utils/token";
import * as userModel from "../models/userModel";
import prisma from "../prisma/client";
import { Request } from "express";
import { encodePayload } from "../utils/encodeDecode";

export const registerUser = async (data: {
  username: string;
  email: string;
  password: string;
}) => {
  const existingUser = await userModel.getUserByEmail(data.email);

  if (existingUser) {
    throw new Error("User account already exist");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await userModel.createUser({
    username: data.username,
    email: data.email,
    password: hashedPassword,
  });

  return user;
};

export const loginUser = async (req: Request, email: string, password: string) => {
  const user = await userModel.getUserByEmail(email);

  if (!user) {
    throw new Error("User account doesn't exists");
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new Error("Password incorrect");
  }

  const userData = {
    id: user.id,
    username: user.username,
    email: user.email,
  };

  const accessToken = generateAccessToken(userData);
  const refreshToken = generateRefreshToken();

  const payload = {
    userId: user.id,
    username: user.username,
    role: 'user',
    issuedAt: Date.now(),
    userAgent: req.headers['user-agent'],
    ipAddress: req.ip
  }

  await prisma.session.create({
    data: {
      userId: userData.id,
      ipAddress: req.ip || '',
      userAgent: req.get("User-Agent") || '',
      payload: encodePayload(payload),
      refreshToken,
      expiresAt: new Date(Date.now() + 1000 * 60 * 24 * 7)
    }
  })

  return { accessToken, refreshToken };
};

export const logoutUser = async (id: number) => {
  const user = await userModel.getUserById(id);

  if (!user) {
    throw new Error(`User with id "${id} doesn't exists"`);
  }

  return true;
};
