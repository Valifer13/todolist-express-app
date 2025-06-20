import express from "express";
import { authRouter } from "./authRoutes";
import { todoRouter } from "./todoRoutes";
import { authenticateTokenMiddleware } from "../../middleware/authMiddleware";
import { responseLoggerMiddleware } from "../../middleware/responseLogger";

export const v1Router = express.Router();

v1Router.use(responseLoggerMiddleware);
v1Router.use(authRouter);

// Middleware auth
v1Router.use(authenticateTokenMiddleware);

v1Router.use(todoRouter);