import { type Request, type Response } from "express";
import * as authService from "../services/authService.js";
import { getJwtCookieOptions } from "../utils/jwtHelper.js";
import { successResponse } from "../utils/response.js";
import type { AuthRequest } from "../middleware/auth.js";
import type AuthResponseDTO from "../dtos/auth/AuthResponseDTO.js";

export const register = async (req: Request, res: Response) => {
  const { username: inputUsername, password } = req.body;

  const authResponse: AuthResponseDTO = await authService.register({
    username: inputUsername,
    password,
  });

  res.cookie("token", authResponse.token, getJwtCookieOptions());

  res.status(201).json(successResponse(authResponse.tokenPayload));
};

export const login = async (req: Request, res: Response) => {
  const { username: inputUsername, password } = req.body;

  const authResponse: AuthResponseDTO = await authService.login({
    username: inputUsername,
    password,
  });

  res.cookie("token", authResponse.token, getJwtCookieOptions());

  res.status(200).json(successResponse(authResponse.tokenPayload));
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("token", getJwtCookieOptions());
  res.status(200).json(successResponse({ message: "Logged out successfully" }));
};

export const me = async (req: AuthRequest, res: Response) => {
  const user = req.user;
  res.status(200).json(successResponse(user));
};
