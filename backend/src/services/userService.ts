import * as userModel from "../models/userModel";

export const allUsersService = async () => {
  return userModel.getAllUser();
}