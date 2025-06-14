import { userDB } from "../data/db"

export const allUsers = () => {
  const users = userDB;
  return users;
}