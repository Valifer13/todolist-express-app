import express from "express";
import { authRouter } from "./authRoutes";
import { todoRouter } from "./todoRoutes";
import { authenticateTokenMiddleware } from "../../middleware/authMiddleware";
import { responseLoggerMiddleware } from "../../middleware/responseLogger";

export const v1 = express.Router();

v1.use(responseLoggerMiddleware);
v1.use(authRouter);

// Middleware auth
v1.use(authenticateTokenMiddleware);

v1.use(todoRouter);