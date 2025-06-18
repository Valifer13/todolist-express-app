import { Request, Response } from "express"
import { stdout } from "process";
import * as authService from "../services/authService";
import { validationResult } from "express-validator";

export const login = async (req: Request, res: Response) => { 
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({ errors: result})
    return;
  }
  
  const ip = req.ip;

  try {
    const tokens = await authService.loginUser(req, req.body.email, req.body.password);
    res
      .status(200)
      .json({
        message: "Login Succesffuly",
        tokens
      });
    stdout.write(`[INFO] ${ip} successfuly login on account ${req.body.email}\n`);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unkown error occured";
    const statusCode = e instanceof Error ? 401 : 500;
    res
      .status(statusCode)
      .json({ message });
    stdout.write(`[INFO] ${ip} trying to login on account ${req.body.email}\n`);
  }
}

export const register = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({ errors: result})
    return;
  }

  const ip = req.ip?.substring(7);

  try {
    await authService.registerUser(req.body);
    res.status(200).json({ "message" : "Sign-in successfully" });
    stdout.write(`[INFO] ${ip} register successfully\n`);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unkown error occured";
    const statusCode = e instanceof Error ? 409 : 500;
    res
      .status(statusCode)
      .json({ message });
    stdout.write(`[INFO] ${ip} trying to register\n`);
  }
}

export const logout = (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400).json({ errors: result})
    return;
  }

  const ip = req.ip?.substring(7);

  try {
    authService.logoutUser(req.body.email);
    res
      .status(200)
      .json({message: "Logout successfully"});
    stdout.write(`[INFO] ${ip} logout from account ${req.body.email}\n`);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unkown error occured";
    const statusCode = e instanceof Error ? 404 : 500;
    res
      .status(statusCode)
      .json({ message });
    stdout.write(`[INFO] ${ip} trying to logout from unexisting account\n`);
  }
}