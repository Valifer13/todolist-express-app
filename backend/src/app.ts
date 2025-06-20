import express, { Request, Response } from "express";
import { v1Router } from "./routes/v1/routes";

export const app = express();

// Middleware
app.use(express.json());
app.set('trust proxy', true);
app.disable('x-powered-by');

app.get('/', (req: Request, res: Response) => {
  res.json({ "message": "Welcome to the Express + Typescript Server!" });
})

app.use('/api/v1', v1Router);