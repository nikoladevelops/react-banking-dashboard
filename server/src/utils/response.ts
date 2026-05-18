import { type ApiResponse } from "../types/apiResponse.js";

export const successResponse = <T>(data: T): ApiResponse<T> => ({
  success: true,
  data,
});

export const errorResponse = (errorCode: string): ApiResponse => ({
  success: false,
  errorCode,
});
