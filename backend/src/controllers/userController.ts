import { Request, Response } from "express"
import { stdout } from "process";

interface User {
  email: string,
  password: string,
}

let userDB: User[] = [];

export const getAllUser = (req: Request, res: Response) => {
  res.json({
    "message": "Retrieve all users account",
    "data": userDB,
  })
}

export const login = (req: Request, res: Response) => { const {email, password} = req.body;
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

export const signIn = (req: Request, res: Response) => {
  const {email, password} = req.body;
  const ip = req.ip?.substring(7);

  if (email === undefined || password === undefined) {
    res.status(400).json({"message": "Email or password is undefined"});
    return;
  }

  let existingUser: User | undefined = userDB.find(user => user.email === email);

  if (existingUser) {
    res.status(409).json({"message": "User already exist"});
    stdout.write(`[INFO] User with IP ${ip} trying to sign up with existing email "${email}"\n`);
    return;
  }

  userDB.push({email, password});
  res.status(200).json({"message": "Sign-in successfully"})
  stdout.write(`[INFO] User with email "${email}" sign up successfully\n`);
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
  stdout.write(`[INFO] User with ip ${ip} logout from account ${email}`);
}