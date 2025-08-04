import { Request, Response } from "express";
import * as authService from "../services/authService";
import { validationResult } from "express-validator";
import { sendResponse } from "../utils/response";

export const loginController = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    sendResponse(res, 400, {
      success: false,
      message: "Failed to login",
      error: {
        errors: result,
      }
    })
    return;
  }

  try {
    const tokens = await authService.loginUserService(
      req,
      req.body.email,
      req.body.password
    );
    sendResponse(res, 200, {
      success: true,
      message: "Successfuly login",
      data: {
        tokens
      }
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unkown error occured";
    const statusCode = e instanceof Error ? 401 : 500;
    sendResponse(res, statusCode, {
      success: false,
      message,
      error: {
        errors: e,
      }
    })
  }
};

export const registerController = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    sendResponse(res, 400, {
      success: false,
      message: "Failed to register",
      error: {
        errors: result
      }
    })
    return;
  }

  try {
    await authService.registerUserService(req.body);
    sendResponse(res, 200, {
      success: true,
      message: "Successfully register"
    })
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unkown error occured";
    const statusCode = e instanceof Error ? 409 : 500;
    sendResponse(res, statusCode, {
      success: false,
      message,
      error: {
        errors: e,
      }
    })
  }
};

export const logoutController = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    sendResponse(res, 400, {
      success: false,
      message: "Failed to logout from accont",
      error: {
        errors: result
      }
    })
    return;
  }

  try {
    await authService.logoutUserService(req.body.refreshToken);
    sendResponse(res, 200, {
      success: true,
      message: "Successfuly logout from account"
    })
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unkown error occured";
    const statusCode = e instanceof Error ? 404 : 500;
    sendResponse(res, statusCode, {
      success: false,
      message,
      error: {
        errors: e,
      }
    })
  }
};

export const refreshTokenController = async (req: Request, res: Response) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return sendResponse(res, 400, {
      success: false,
      message: "Failed to refresh the token",
      error: {
        errors: result,
      }
    })
  }

  try {
    const accessToken = await authService.refreshTokenService(req, req.body.token);
    return sendResponse(res, 200, {
      success: true,
      message: "Successfully create new access token",
      data: {
        accessToken
      }
    })
  } catch(e) {
    const message = e instanceof Error ? e.message : "Unkown error occured";
    const statusCode = e instanceof Error ? 404 : 500;
    return sendResponse(res, statusCode, {
      success: false,
      message,
      error: {
        errors: e,
      }
    })
  }
}