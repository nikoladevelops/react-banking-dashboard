import { type Request, type Response, type NextFunction } from "express";
import { verifyToken } from "../utils/jwtHelper.js";
import { errorResponse } from "../utils/response.js";
import { ErrorKeys } from "../constants/errorKeys.js";

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
  const token: string | undefined = req.cookies?.token;

  if (!token) {
    return res.status(401).json(errorResponse(ErrorKeys.auth.tokenMissing));
  }

  try {
    const decoded = verifyToken(token);

    req.user = {
      id: decoded.id,
      username: decoded.username,
    };

    next();
  } catch (error: any) {
    return res.status(401).json(errorResponse(ErrorKeys.auth.tokenInvalid));
  }
};
