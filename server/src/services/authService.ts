import { z } from "zod";
import * as userService from "./userService.js";
import type RegisterUserDTO from "../dtos/auth/RegisterUserDTO.js";
import {
  BadRequestError,
  ConflictError,
  UnauthorizedError,
} from "../utils/errors.js";
import { ErrorKeys } from "../constants/errorKeys.js";
import type CreateUserDTO from "../dtos/user/CreateUserDTO.js";
import { generateToken, type AuthTokenPayload } from "../utils/jwtHelper.js";
import type LoginUserDTO from "../dtos/auth/LoginUserDTO.js";
import type AuthResponseDTO from "../dtos/auth/AuthResponseDTO.js";
import { Role } from "../enums/role.enum.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const cyrillicRegex = /^[\u0400-\u04FF\s]+$/;
const latinRegex = /^[a-zA-Z\s]+$/;
const phoneRegex = /^\+?[\d\-. ]{7,15}$/;
const passwordRegex = /[!@#$%^&*(),.?":{}|<>]/;

const registerSchema = z.object({
  username: z
    .string()
    .trim()
    .refine((val) => val.length >= 3, {
      params: { code: ErrorKeys.auth.usernameInvalid },
    }),
  password: z
    .string()
    .refine((val) => val.length >= 8 && passwordRegex.test(val), {
      params: { code: ErrorKeys.auth.passwordInvalid },
    }),
  email: z
    .string()
    .trim()
    .refine((val) => emailRegex.test(val), {
      params: { code: ErrorKeys.auth.emailInvalid },
    }),
  egn: z
    .string()
    .trim()
    .refine((val) => /^\d{10}$/.test(val), {
      params: { code: ErrorKeys.auth.egnInvalid },
    }),
  identityDoc: z.string().trim().optional().or(z.literal("")),
  fullNameCyrillic: z
    .string()
    .trim()
    .refine((val) => cyrillicRegex.test(val), {
      params: { code: ErrorKeys.auth.nameCyrillicInvalid },
    }),
  fullNameLatin: z
    .string()
    .trim()
    .refine((val) => latinRegex.test(val), {
      params: { code: ErrorKeys.auth.nameLatinInvalid },
    }),
  phone: z
    .string()
    .trim()
    .refine((val) => phoneRegex.test(val), {
      params: { code: ErrorKeys.auth.phoneInvalid },
    }),
  address: z
    .string()
    .trim()
    .refine((val) => val.length >= 5, {
      params: { code: ErrorKeys.auth.addressInvalid },
    }),
});

export const register = async (
  dto: RegisterUserDTO,
): Promise<AuthResponseDTO> => {
  const { confirmPassword, ...registerData } = dto;

  const result = registerSchema.safeParse(registerData);
  if (!result.success) {
    const firstIssue = result.error.issues[0];

    const errorCode =
      firstIssue && firstIssue.code === "custom" && firstIssue.params
        ? (firstIssue.params.code as string)
        : ErrorKeys.users.missingRequiredFields;

    throw new BadRequestError("Validation failed", errorCode);
  }

  if (registerData.password !== confirmPassword) {
    throw new BadRequestError(
      "Passwords do not match",
      ErrorKeys.auth.passwordsDoNotMatch,
    );
  }

  const [existingUser, existingEmail] = await Promise.all([
    userService.getUserByUsername(registerData.username),
    userService.getUserByEmail(registerData.email),
  ]);

  if (existingUser) {
    throw new ConflictError(
      "Username already taken",
      ErrorKeys.auth.usernameAlreadyTaken,
    );
  }
  if (existingEmail) {
    throw new ConflictError(
      "Email already registered",
      ErrorKeys.users.emailAlreadyTaken,
    );
  }

  const newUser = await userService.createUser({
    ...registerData,
    role: Role.USER,
  });

  const payload: AuthTokenPayload = {
    id: newUser._id.toString(),
    username: newUser.username,
    role: newUser.role,
  };

  return { tokenPayload: payload, token: generateToken(payload) };
};

export const login = async (dto: LoginUserDTO): Promise<AuthResponseDTO> => {
  if (!dto?.username || !dto?.password) {
    throw new BadRequestError(
      "Missing credentials",
      ErrorKeys.auth.invalidCredentials,
    );
  }

  const user = await userService.getUserByUsername(dto.username);

  if (!user || !(await user.comparePassword(dto.password))) {
    throw new UnauthorizedError(
      "Invalid credentials",
      ErrorKeys.auth.invalidCredentials,
    );
  }

  if (user.isBlocked) {
    throw new UnauthorizedError(
      "Account is blocked",
      ErrorKeys.auth.accountBlocked,
    );
  }

  const payload: AuthTokenPayload = {
    id: user._id.toString(),
    username: user.username,
    role: user.role,
  };

  return { tokenPayload: payload, token: generateToken(payload) };
};
