import { type Request, type Response, type NextFunction } from "express";
import { verifyToken, type AuthTokenPayload } from "../utils/jwtHelper.js";
import { Role } from "../enums/role.enum.js";
import { ErrorKeys } from "../constants/errorKeys.js";
import { getUserById } from "../services/userService.js";
import { ForbiddenError, UnauthorizedError } from "../utils/errors.js";
import type { UserContext } from "../types/userContext.js";

export interface AuthRequest<
  P = any,
  ResBody = any,
  ReqBody = any,
  ReqQuery = any,
> extends Request<P, ResBody, ReqBody, ReqQuery> {
  user?: UserContext;
}

const authenticate = async (req: AuthRequest, res: Response) => {
  const token = req.cookies?.token;

  if (!token) {
    throw new UnauthorizedError(
      "No token provided",
      ErrorKeys.auth.tokenMissing,
    );
  }

  let tokenPayload: AuthTokenPayload;
  try {
    tokenPayload = verifyToken(token);
  } catch {
    throw new UnauthorizedError("Invalid token", ErrorKeys.auth.tokenInvalid);
  }

  const user = await getUserById(tokenPayload.id);
  if (!user) {
    throw new UnauthorizedError("User not found", ErrorKeys.users.userNotFound);
  }

  if (user.isBlocked) {
    throw new ForbiddenError(
      "User account is blocked",
      ErrorKeys.auth.accountBlocked,
    );
  }

  req.user = {
    id: user._id.toString(),
    username: user.username,
    role: user.role,
  };
};

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  await authenticate(req, res);
  next();
};

export const adminProtect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  await authenticate(req, res);

  if (req.user?.role !== Role.ADMIN) {
    throw new ForbiddenError(
      "Admin privileges required",
      ErrorKeys.auth.forbiddenAccessToResource,
    );
  }

  next();
};
