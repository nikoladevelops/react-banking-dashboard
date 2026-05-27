import { type Request, type Response } from "express";
import * as userService from "../services/userService.js";
import { successResponse } from "../utils/response.js";
import type { IUser } from "../models/User.js";
import type UserResponseDTO from "../dtos/user/UserResponseDTO.js";

function toUserResponseDTO(user: IUser): UserResponseDTO {
  return {
    id: user._id.toString(),
    username: user.username,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  const response = users.map(toUserResponseDTO);
  res.status(200).json(successResponse(response));
};

export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const user = await userService.getUserByIdOrThrow(req.params.id);
  const response = toUserResponseDTO(user);
  res.status(200).json(successResponse(response));
};

export const createUser = async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  const response = toUserResponseDTO(user);
  res.status(201).json(successResponse(response));
};

export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const user = await userService.updateUser(req.params.id, req.body);
  const response = toUserResponseDTO(user);
  res.status(200).json(successResponse(response));
};

export const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const user = await userService.deleteUser(req.params.id);
  const response = toUserResponseDTO(user);
  res.status(200).json(successResponse(response));
};
