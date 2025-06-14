import bcrypt from "bcrypt";
import { User, userDB } from "../data/db";

export const registerUser = async (user: User) => {
  let existingUser: User | undefined = userDB.find(
    (user) => user.email === user.email
  );

  if (existingUser) {
    throw new Error("User account already exist");
  }

  const hashedPassword = await bcrypt.hash(user.password, 10);

  const userData: User = {
    username: user.username,
    email: user.email,
    password: hashedPassword,
  }

  const newUser = userDB.push(userData);
  return newUser;
}