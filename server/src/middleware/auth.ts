import { type Request, type Response, type NextFunction } from "express";
import { verifyToken, type AuthTokenPayload } from "../utils/jwtHelper.js";
import { ErrorKeys } from "../constants/errorKeys.js";
import { getUserById } from "../services/userService.js";
import { UnauthorizedError } from "../utils/errors.js";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    username: string;
    role: string;
  };
}

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
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
  } catch (err) {
    throw new UnauthorizedError("Invalid token", ErrorKeys.auth.tokenInvalid);
  }

  const user = await getUserById(tokenPayload.id);
  if (!user) {
    throw new UnauthorizedError("User not found", ErrorKeys.users.userNotFound);
  }

  req.user = {
    id: user._id.toString(),
    username: user.username,
    role: user.role,
  };

  next();
};
