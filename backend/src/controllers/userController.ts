import { Request, Response } from "express"
import { userDB } from "../data/db";

export const getAllUser = (req: Request, res: Response) => {
  res.json({
    "message": "Retrieve all users account",
    "data": userDB,
  })
}