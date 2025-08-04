import bcrypt from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../utils/token";
import * as userModel from "../models/userModel";
import prisma from "../prisma/client";
import { Request } from "express";
import { encodePayload } from "../utils/encodeDecode";

export const registerUserService = async (data: {
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

export const loginUserService = async (
  req: Request,
  email: string,
  password: string
) => {
  const user = await userModel.getUserByEmail(email);

  if (!user) {
    throw new Error("User account doesn't exists");
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throw new Error("Password incorrect");
  }

  const payload = {
    id: user.id,
    role: "user",
    issuedAt: Date.now(),
  };

  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken();

  await prisma.session.create({
    data: {
      userId: user.id,
      ipAddress: req.ip || "",
      refreshToken,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    },
  });

  return { accessToken, refreshToken };
};

export const logoutUserService = async (refreshToken: string) => {
  return prisma.session.deleteMany({
    where: {
      refreshToken,
    },
  });
};

export const refreshTokenService = async (req: Request, token: string) => {
  const session = await prisma.session.findFirst({
    where: {
      refreshToken: token
    },
    include: {
      user: true
    }
  })
  
  if (!session) {
    throw new Error("Session with given refresh token does not exist");
  }

  if (session.expiresAt.getTime() < Date.now()) {
    throw new Error("Session already expired");
  }

  const payload = {
    id: session.user.id,
    role: "user",
    issuedAt: Date.now(),
  };

  return generateAccessToken(payload);
}