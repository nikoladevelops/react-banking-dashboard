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

export const getUserByEmail = async (email: string): Promise<IUser | null> => {
  return await userRepository.findByEmail(email);
};

export const getUserByIdOrThrow = async (id: string): Promise<IUser> => {
  const user = await getUserById(id);
  if (!user) {
    throw new NotFoundError("User not found", ErrorKeys.users.userNotFound);
  }
  return user;
};

export const createUser = async (dto: CreateUserDTO): Promise<IUser> => {
  if (
    !dto.username ||
    !dto.password ||
    !dto.email ||
    !dto.egn ||
    !dto.fullNameLatin
  ) {
    throw new BadRequestError(
      "Missing required fields",
      ErrorKeys.users.missingRequiredFields,
    );
  }

  if (await getUserByUsername(dto.username)) {
    throw new ConflictError(
      "Username already taken",
      ErrorKeys.auth.usernameAlreadyTaken,
    );
  }

  if (await getUserByEmail(dto.email)) {
    throw new ConflictError(
      "Email already registered",
      ErrorKeys.users.emailAlreadyTaken,
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

  if (Object.keys(dto).length === 0) {
    throw new BadRequestError(
      "No update data provided",
      ErrorKeys.users.updateFieldsRequired,
    );
  }

  const currentUser = await getUserById(id);
  if (!currentUser) {
    throw new NotFoundError("User not found", ErrorKeys.users.userNotFound);
  }

  if (dto.username && dto.username !== currentUser.username) {
    if (await getUserByUsername(dto.username)) {
      throw new ConflictError(
        "Username taken",
        ErrorKeys.auth.usernameAlreadyTaken,
      );
    }
  }

  if (dto.email && dto.email !== currentUser.email) {
    if (await getUserByEmail(dto.email)) {
      throw new ConflictError("Email taken", ErrorKeys.users.emailAlreadyTaken);
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
