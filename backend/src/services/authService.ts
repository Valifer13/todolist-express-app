import bcrypt from "bcrypt";
import { User, userDB } from "../data/db";
import { generateAccessToken, generateRefreshToken } from "../utils/token";

export const registerUser = async (data: User) => {
  let existingUser: User | undefined = userDB.find(
    (user) => user.email === data.email
  );

  if (existingUser) {
    throw new Error("User account already exist");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const userData: User = {
    username: data.username,
    email: data.email,
    password: hashedPassword,
  }

  const newUser = userDB.push(userData);
  return newUser;
}

export const loginUser = async (email: string, password: string) => {
  let user: User | undefined = userDB.find(user => user.email === email);

  if (!user) {
    throw new Error("User account doesn't exists");
  }
  
  if (!await bcrypt.compare(password, user.password)) {
    throw new Error("Password incorrect");
  }

  const userData = {
    username: user.username,
    email: user.email
  }

  const accessToken = generateAccessToken(userData);
  const refreshToken = generateRefreshToken(userData);

  return { accessToken, refreshToken };
}

export const logoutUser = (email: string) => {
  let user: User | undefined = userDB.find(user => user.email === email);

  if (!user) {
    throw new Error(`User with email "${email} doesn't exists"`);
  }

  return true;
}