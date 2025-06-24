import { Request, Response } from "express"
import * as userService from "../services/userService";
import { sendResponse } from "../utils/response";

export const getAllUserController = async (req: Request, res: Response) => {
  sendResponse(res, 200, {
    success: true,
    message: "Retireve all users account",
    data: {
      users: await userService.allUsersService(),
    },
  })
}