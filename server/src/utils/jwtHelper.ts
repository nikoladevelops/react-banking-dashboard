import jwt from "jsonwebtoken";
import { type CookieOptions } from "express";

export interface AuthTokenPayload {
  id: string;
  username: string;
  role: string;
}

export const getJwtCookieOptions = (): CookieOptions => {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 1000, // 1 hour
  };
};

export const generateToken = (payload: AuthTokenPayload) => {
  const secret = getJwtSecret();
  return jwt.sign(payload, secret, { expiresIn: "1h" });
};

export const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  return secret;
};

export const verifyToken = (token: string): AuthTokenPayload => {
  const decoded = jwt.verify(token, getJwtSecret()) as AuthTokenPayload;
  return decoded;
};
