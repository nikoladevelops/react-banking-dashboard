import { type Request, type Response } from "express";
import mongoose from "mongoose";
import * as userService from "../services/userService.js";
import { successResponse } from "../utils/response.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { BadRequestError, NotFoundError } from "../utils/errors.js";
import { ErrorKeys } from "../constants/errorKeys.js";
import type CreateUserDTO from "../dtos/user/CreateUserDTO.js";
import type UpdateUserDTO from "../dtos/user/UpdateUserDTO.js";
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

export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await userService.getAllUsers();

  const response = users.map(toUserResponseDTO);
  res.status(200).json(successResponse(response));
});

export const getUserById = asyncHandler(
  async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError(
        "Invalid user ID",
        ErrorKeys.users.invalidUserId,
      );
    }

    const user = await userService.getUserById(id);
    if (!user) {
      throw new NotFoundError("User not found", ErrorKeys.users.userNotFound);
    }

    const response = toUserResponseDTO(user);
    res.status(200).json(successResponse(response));
  },
);

export const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username) {
    throw new BadRequestError(
      "Username required",
      ErrorKeys.users.usernameRequired,
    );
  }

  if (!password) {
    throw new BadRequestError(
      "Password required",
      ErrorKeys.users.passwordRequired,
    );
  }

  const createUserDto: CreateUserDTO = { username, password };

  const user = await userService.createUser(createUserDto);

  const response = toUserResponseDTO(user);
  res.status(201).json(successResponse(response));
});

export const updateUser = asyncHandler(
  async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const { username, password } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError(
        "Invalid user ID",
        ErrorKeys.users.invalidUserId,
      );
    }

    if (username === undefined && password === undefined) {
      throw new BadRequestError(
        "At least one field required",
        ErrorKeys.users.updateFieldsRequired,
      );
    }

    const updateUserDto: UpdateUserDTO = { username, password };

    const user = await userService.updateUser(id, updateUserDto);

    const response = toUserResponseDTO(user);
    res.status(200).json(successResponse(response));
  },
);

export const deleteUser = asyncHandler(
  async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError(
        "Invalid user ID",
        ErrorKeys.users.invalidUserId,
      );
    }

    const user = await userService.deleteUser(id);

    const response = toUserResponseDTO(user);
    res.status(200).json(successResponse(response));
  },
);
