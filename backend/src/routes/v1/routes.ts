import express from "express";
import { authRouter } from "./authRoutes";

export const v1 = express.Router();

v1.use(authRouter);