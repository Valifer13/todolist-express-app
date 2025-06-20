import { NextFunction, Request, Response } from "express";
import { stdout } from "process";
import { v4 as uuidv4 } from "uuid";

export const responseLoggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const responseId = uuidv4();
  res.locals.responseId = responseId;

  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    stdout.write(`[${responseId}] ${req.ip} ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)\n`);
  })

  next();
}