import * as userModel from "../models/userModel";

export const allUsers = async () => {
  return userModel.getAllUser();
}