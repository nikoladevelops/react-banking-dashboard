import { type AuthRequest } from "../middleware/auth.js";
import { type UserContext } from "../types/userContext.js";
import { UnauthorizedError } from "../utils/errors.js";
import { ErrorKeys } from "../constants/errorKeys.js";
import { Role } from "../enums/role.enum.js";

export const getAuthenticatedUser = (req: AuthRequest): UserContext => {
  if (!req.user) {
    throw new UnauthorizedError("Unauthorized", ErrorKeys.auth.tokenMissing);
  }

  const isRoleValid = Object.values(Role).includes(req.user.role as Role);

  if (!isRoleValid) {
    throw new UnauthorizedError("Unauthorized", ErrorKeys.auth.invalidRole);
  }

  return req.user;
};
