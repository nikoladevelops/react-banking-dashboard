import mongoose from "mongoose";
import type CreateUserDTO from "../dtos/user/CreateUserDTO.js";
import type UpdateUserDTO from "../dtos/user/UpdateUserDTO.js";
import { type IUser } from "../models/User.js";
import userRepository from "../repositories/userRepository.js";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
} from "../utils/errors.js";
import { ErrorKeys } from "../constants/errorKeys.js";

function isValidObjectId(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id);
}

export const getUserById = async (id: string): Promise<IUser | null> => {
  return await userRepository.findById(id);
};

export const getUserByUsername = async (
  username: string,
): Promise<IUser | null> => {
  return await userRepository.findByUsername(username);
};

export const getUserByIdOrThrow = async (id: string): Promise<IUser> => {
  const user = await getUserById(id);

  if (!user) {
    throw new NotFoundError("User not found", ErrorKeys.users.userNotFound);
  }

  return user;
};

export const createUser = async (dto: CreateUserDTO): Promise<IUser> => {
  if (!dto.username) {
    throw new BadRequestError(
      "Username required",
      ErrorKeys.users.usernameRequired,
    );
  }

  if (!dto.password) {
    throw new BadRequestError(
      "Password required",
      ErrorKeys.users.passwordRequired,
    );
  }

  const existing = await getUserByUsername(dto.username);
  if (existing) {
    throw new ConflictError(
      "Username already taken",
      ErrorKeys.auth.usernameAlreadyTaken,
    );
  }

  return await userRepository.createUser(dto);
};

export const getAllUsers = async (): Promise<IUser[]> => {
  return await userRepository.getAllUsers();
};

export const updateUser = async (
  id: string,
  dto: UpdateUserDTO,
): Promise<IUser> => {
  if (!isValidObjectId(id)) {
    throw new BadRequestError("Invalid user ID", ErrorKeys.users.invalidUserId);
  }

  if (dto.username === undefined && dto.password === undefined) {
    throw new BadRequestError(
      "At least one field required",
      ErrorKeys.users.updateFieldsRequired,
    );
  }

  const currentUser = await getUserById(id);
  if (!currentUser) {
    throw new NotFoundError("User not found", ErrorKeys.users.userNotFound);
  }

  if (dto.username && dto.username !== currentUser.username) {
    const userExists = await getUserByUsername(dto.username);

    if (userExists) {
      throw new ConflictError(
        "Username already taken",
        ErrorKeys.auth.usernameAlreadyTaken,
      );
    }
  }

  const updated = await userRepository.updateUser(id, dto);
  if (!updated) {
    throw new NotFoundError("User not found", ErrorKeys.users.userNotFound);
  }

  return updated;
};

export const deleteUser = async (id: string): Promise<IUser> => {
  if (!isValidObjectId(id)) {
    throw new BadRequestError("Invalid user ID", ErrorKeys.users.invalidUserId);
  }

  const deleted = await userRepository.deleteUser(id);

  if (!deleted) {
    throw new NotFoundError("User not found", ErrorKeys.users.userNotFound);
  }

  return deleted;
};
