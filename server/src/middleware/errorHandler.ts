import { type Request, type Response, type NextFunction } from "express";
import { AppError } from "../utils/errors.js";
import { errorResponse } from "../utils/response.js";
import { ErrorKeys } from "../constants/errorKeys.js";

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json(errorResponse(err.errorKey));
  }

  console.error("Unhandled error:", err);
  res.status(500).json(errorResponse(ErrorKeys.server.internalServerError));
};
