import { type Response } from "express";
import * as userService from "../services/userService.js";
import { successResponse } from "../utils/response.js";
import type { IUser } from "../models/User.js";
import type UserResponseDTO from "../dtos/user/UserResponseDTO.js";
import { BadRequestError, UnauthorizedError } from "../utils/errors.js";
import { ErrorKeys } from "../constants/errorKeys.js";
import type { UserSearchFiltersDTO } from "../dtos/user/UserSearchFiltersDTO.js";
import { Role } from "../enums/role.enum.js";
import type { AuthRequest } from "../middleware/auth.js";
import { getAuthenticatedUser } from "../utils/authHelpers.js";

function toUserResponseDTO(user: IUser): UserResponseDTO {
  const dto: UserResponseDTO = {
    id: user._id.toString(),
    username: user.username,
    role: user.role,
    isBlocked: user.isBlocked,
    egn: user.egn,

    email: user.email,
    fullNameLatin: user.fullNameLatin,
    fullNameCyrillic: user.fullNameCyrillic,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  if (user.identityDoc) {
    dto.identityDoc = user.identityDoc;
  }

  return dto;
}

export const getAllUsers = async (req: AuthRequest, res: Response) => {
  const {
    username,
    email,
    egn,
    fullNameCyrillic,
    fullNameLatin,
    role,
    isBlocked,
  } = req.query;

  const filters: UserSearchFiltersDTO = {};

  if (username) {
    filters.username = username as string;
  }

  if (email) {
    filters.email = email as string;
  }

  if (egn) {
    filters.egn = egn as string;
  }

  if (fullNameCyrillic) {
    filters.fullNameCyrillic = fullNameCyrillic as string;
  }

  if (fullNameLatin) {
    filters.fullNameLatin = fullNameLatin as string;
  }

  if (role) {
    if (Object.values(Role).includes(role as Role)) {
      filters.role = role as Role;
    }
  }

  if (isBlocked === "true") {
    filters.isBlocked = true;
  } else if (isBlocked === "false") {
    filters.isBlocked = false;
  }

  const users = await userService.findUsers(filters);
  res.status(200).json(successResponse(users.map(toUserResponseDTO)));
};

export const getUserById = async (
  req: AuthRequest<{ id: string }>,
  res: Response,
) => {
  const actor = getAuthenticatedUser(req);

  const isOwner = actor.id === req.params.id;
  const isAdmin = actor.role === Role.ADMIN;

  if (!isOwner && !isAdmin) {
    throw new UnauthorizedError(
      "You are not authorized to perform this action.",
      ErrorKeys.auth.forbiddenAccessToResource,
    );
  }

  const user = await userService.getUserByIdOrThrow(req.params.id);
  res.status(200).json(successResponse(toUserResponseDTO(user)));
};

export const getUserByUsername = async (
  req: AuthRequest<{ username: string }>,
  res: Response,
) => {
  const user = await userService.getUserByUsernameOrThrow(req.params.username);

  res.status(200).json(successResponse(toUserResponseDTO(user)));
};

export const createUser = async (req: AuthRequest, res: Response) => {
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
  req: AuthRequest<{ id: string }>,
  res: Response,
) => {
  const user = await userService.updateUser(req.params.id, req.body);
  res.status(200).json(successResponse(toUserResponseDTO(user)));
};

export const deleteUser = async (
  req: AuthRequest<{ id: string }>,
  res: Response,
) => {
  const user = await userService.deleteUser(req.params.id);
  res.status(200).json(successResponse(toUserResponseDTO(user)));
};

export const blockUserByUsername = async (
  req: AuthRequest<{ username: string }>,
  res: Response,
) => {
  const actor = getAuthenticatedUser(req);

  const user = await userService.blockUserByUsername(
    actor,
    req.params.username,
  );
  res.status(200).json(successResponse(toUserResponseDTO(user)));
};

export const unblockUserByUsername = async (
  req: AuthRequest<{ username: string }>,
  res: Response,
) => {
  const actor = getAuthenticatedUser(req);

  const user = await userService.unblockUserByUsername(
    actor,
    req.params.username,
  );

  res.status(200).json(successResponse(toUserResponseDTO(user)));
};
