import * as userService from "./userService.js";
import type RegisterUserDTO from "../dtos/auth/RegisterUserDTO.js";
import {
  BadRequestError,
  ConflictError,
  UnauthorizedError,
} from "../utils/errors.js";
import { ErrorKeys } from "../constants/errorKeys.js";
import type CreateUserDTO from "../dtos/user/CreateUserDTO.js";
import { generateToken } from "../utils/jwtHelper.js";
import type LoginUserDTO from "../dtos/auth/LoginUserDTO.js";

export const register = async (
  dto: RegisterUserDTO,
): Promise<{ id: string; username: string; token: string }> => {
  const { username: inputUsername, password } = dto;

  if (!inputUsername) {
    throw new BadRequestError(
      "Username is required",
      ErrorKeys.auth.usernameRequired,
    );
  }

  if (!password) {
    throw new BadRequestError(
      "Password is required",
      ErrorKeys.auth.passwordRequired,
    );
  }

  const existingUser = await userService.getUserByUsername(inputUsername);

  if (existingUser) {
    throw new ConflictError(
      "Username already taken",
      ErrorKeys.auth.usernameAlreadyTaken,
    );
  }

  const createUserDto: CreateUserDTO = { username: inputUsername, password };
  const newUser = await userService.createUser(createUserDto);

  const token = generateToken({
    id: newUser._id.toString(),
    username: newUser.username,
  });

  return { id: newUser._id.toString(), username: newUser.username, token };
};

export const login = async (dto: LoginUserDTO) => {
  const { username: inputUsername, password } = dto;

  if (!inputUsername) {
    throw new BadRequestError(
      "Username is required",
      ErrorKeys.auth.usernameRequired,
    );
  }

  if (!password) {
    throw new BadRequestError(
      "Password is required",
      ErrorKeys.auth.passwordRequired,
    );
  }

  const user = await userService.getUserByUsername(inputUsername);
  if (!user) {
    throw new UnauthorizedError(
      "Invalid credentials",
      ErrorKeys.auth.invalidCredentials,
    );
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new UnauthorizedError(
      "Invalid credentials",
      ErrorKeys.auth.invalidCredentials,
    );
  }

  const token = generateToken({
    id: user._id.toString(),
    username: user.username,
  });

  return { id: user._id.toString(), username: user.username, token };
};
