import { type Request, type Response } from "express";
import * as userService from "../services/userService.js";
import { successResponse } from "../utils/response.js";
import type { IUser } from "../models/User.js";
import type UserResponseDTO from "../dtos/user/UserResponseDTO.js";
import { BadRequestError } from "../utils/errors.js";
import { ErrorKeys } from "../constants/errorKeys.js";

function toUserResponseDTO(user: IUser): UserResponseDTO {
  return {
    id: user._id.toString(),
    username: user.username,
    email: user.email,
    fullNameLatin: user.fullNameLatin,
    fullNameCyrillic: user.fullNameCyrillic,
    isBlocked: user.isBlocked,
    role: user.role,
    egn: user.egn,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  res.status(200).json(successResponse(users.map(toUserResponseDTO)));
};

export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const user = await userService.getUserByIdOrThrow(req.params.id);
  res.status(200).json(successResponse(toUserResponseDTO(user)));
};

export const createUser = async (req: Request, res: Response) => {
  const { password, confirmPassword, ...userData } = req.body;

  if (password !== confirmPassword) {
    throw new BadRequestError(
      "Passwords do not match",
      ErrorKeys.auth.passwordsDoNotMatch,
    );
  }

  const user = await userService.createUser({ ...userData, password });

  res.status(201).json(successResponse(toUserResponseDTO(user)));
};

export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const user = await userService.updateUser(req.params.id, req.body);
  res.status(200).json(successResponse(toUserResponseDTO(user)));
};

export const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const user = await userService.deleteUser(req.params.id);
  res.status(200).json(successResponse(toUserResponseDTO(user)));
};
