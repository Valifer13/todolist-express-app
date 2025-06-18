import { Request, Response } from "express"
import * as userService from "../services/userService";

export const getAllUser = async (req: Request, res: Response) => {
  res.json({
    "message": "Retrieve all users account",
    "data": await userService.allUsers(),
  })
}