import { Request, Response } from "express"
import { stdout } from "process";
import { userDB, User } from "../data/db";
import * as authService from "../services/authService";

export const login = (req: Request, res: Response) => { 
  const {email, password} = req.body;
  const ip = req.ip?.substring(7);

  let user: User | undefined = userDB.find(user => user.email === email);

  if (!user) {
    res.status(404).json({"message": "User not found"});
    stdout.write(`[INFO] User with IP ${ip} trying to login to non-exist account\n`);
    return;
  }
  
  if (password !== user.password) {
    res.status(401).json({"message": "Password Incorrect"})
    stdout.write(`[INFO] User with IP ${ip} trying to login to "${email}" account\n`);
    return;
  }

  res.status(200).json({"message": "Login successful"})
  stdout.write(`[INFO] User with email "${email}" login successfully\n`);
}

export const signIn = async (req: Request, res: Response) => {
  const ip = req.ip?.substring(7);
  try {
    const { username, email, password } = req.body;

    if (
      email === undefined ||
      password === undefined ||
      username === undefined
    ) {
      res
        .status(400)
        .json({ message: "Username, email or password is undefined" });
      return;
    }

    await authService.registerUser(req.body);
    res.status(200).json({ "message" : "Sign-in successfully" });
    stdout.write(`[INFO] User with email "${email}" sign in successfully\n`);
  } catch (err) {
    res.status(500).json({
      "message": "Can't sign-in successfully",
      "error": err
    });
    stdout.write(`[ERROR] ${err}\n`);
  }
}

export const logout = (req: Request, res: Response) => {
  const { email } = req.body;
  const ip = req.ip?.substring(7);

  if (email === undefined) {
    res.status(400).json({"message": "Email is undefined"});
    return;
  }

  let user: User | undefined = userDB.find(user => user.email === email);

  if (!user) {
    res.status(404).json({"message": `Account with email = ${email} doesn't exist`});
    return;
  }

  res.status(200).json({"message": "Logout successfully"});
  stdout.write(`[INFO] User with ip ${ip} logout from account ${email}\n`);
}