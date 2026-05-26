import type CreateUserDTO from "../dtos/user/CreateUserDTO.js";
import type UpdateUserDTO from "../dtos/user/UpdateUserDTO.js";
import { type IUser } from "../models/User.js";
import userRepository from "../repositories/userRepository.js";
import { ConflictError, NotFoundError } from "../utils/errors.js";
import { ErrorKeys } from "../constants/errorKeys.js";

export const createUser = async (dto: CreateUserDTO): Promise<IUser> => {
  const userExists = await userRepository.findByUsername(dto.username);

  if (userExists) {
    throw new ConflictError(
      "User already exists",
      ErrorKeys.auth.usernameAlreadyTaken,
    );
  }

  const user = await userRepository.createUser(dto);
  return user;
};

export const getAllUsers = async (): Promise<IUser[]> => {
  const users = await userRepository.getAllUsers();

  return users;
};

export const getUserById = async (id: string): Promise<IUser | null> => {
  const user = await userRepository.findById(id);

  return user;
};

export const getUserByUsername = async (
  username: string,
): Promise<IUser | null> => {
  const user = await userRepository.findByUsername(username);

  return user;
};

export const updateUser = async (
  id: string,
  dto: UpdateUserDTO,
): Promise<IUser> => {
  const currentUser = await userRepository.findById(id);

  if (!currentUser) {
    throw new NotFoundError("User not found", ErrorKeys.users.userNotFound);
  }

  if (dto.username && dto.username !== currentUser.username) {
    const userExists = await userRepository.findByUsername(dto.username);

    if (userExists) {
      throw new ConflictError(
        "Username already taken",
        ErrorKeys.auth.usernameAlreadyTaken,
      );
    }
  }

  const user = await userRepository.updateUser(id, dto);

  if (!user) {
    throw new NotFoundError("User not found", ErrorKeys.users.userNotFound);
  }

  return user;
};

export const deleteUser = async (id: string): Promise<IUser> => {
  const result = await userRepository.deleteUser(id);

  if (!result) {
    throw new NotFoundError("User not found", ErrorKeys.users.userNotFound);
  }

  return result;
};
