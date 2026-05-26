import { type Request, type Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import * as authService from "../services/authService.js";
import { getJwtCookieOptions } from "../utils/jwtHelper.js";
import type AuthResponseDTO from "../dtos/auth/AuthResponseDTO.js";
import { successResponse } from "../utils/response.js";
import type { AuthRequest } from "../middleware/auth.js";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { username: inputUsername, password } = req.body;

  const { id, username, token } = await authService.register({
    username: inputUsername,
    password,
  });

  res.cookie("token", token, getJwtCookieOptions());

  const response: AuthResponseDTO = { id, username };
  res.status(201).json(successResponse(response));
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { username: inputUsername, password } = req.body;

  const { id, username, token } = await authService.login({
    username: inputUsername,
    password,
  });

  res.cookie("token", token, getJwtCookieOptions());

  const response: AuthResponseDTO = { id, username };
  res.status(200).json(successResponse(response));
});

export const logout = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie("token", getJwtCookieOptions());
  res.status(200).json(successResponse({ message: "Logged out successfully" }));
});

export const me = asyncHandler(async (req: AuthRequest, res: Response) => {
  const user = req.user;
  res.status(200).json(successResponse(user));
});
