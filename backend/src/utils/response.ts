import { Response } from "express";

type ApiResponse = {
  apiVersion: string,
  id: string;
  success: boolean;
  context?: string;
  message?: string;
  data?: any;
  error?: any;
}

export const sendResponse = (res: Response, statusCode: number, options: Omit<ApiResponse, 'id' | 'apiVersion'>) => {
  const response: ApiResponse = {
    apiVersion: process.env.API_VERSION!,
    id: res.locals.responseId || 'unkown',
    ...options,
  }

  return res.status(statusCode).json(response);
}