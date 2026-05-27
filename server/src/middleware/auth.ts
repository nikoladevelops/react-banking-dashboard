import { type Request, type Response, type NextFunction } from "express";
import { verifyToken } from "../utils/jwtHelper.js";
import { ErrorKeys } from "../constants/errorKeys.js";
import { getUserById } from "../services/userService.js";
import { UnauthorizedError } from "../utils/errors.js";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    username: string;
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

  let decoded;
  try {
    decoded = verifyToken(token);
  } catch (err) {
    throw new UnauthorizedError("Invalid token", ErrorKeys.auth.tokenInvalid);
  }

  const user = await getUserById(decoded.id);
  if (!user) {
    throw new UnauthorizedError("User not found", ErrorKeys.users.userNotFound);
  }

  req.user = {
    id: decoded.id,
    username: decoded.username,
  };

  next();
};
