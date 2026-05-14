import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    username: string;
  };
}

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  return secret;
};

export const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const token: string | undefined = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, no token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, getJwtSecret()) as {
      id: string;
      username: string;
    };

    req.user = {
      id: decoded.id,
      username: decoded.username,
    };

    next();
  } catch (error: any) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, token failed",
      error: error.message,
    });
  }
};
