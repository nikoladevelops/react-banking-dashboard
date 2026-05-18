import jwt from "jsonwebtoken";
import { type CookieOptions } from "express";

interface DecodedToken {
  id: string;
  username: string;
}

export const getJwtCookieOptions = (): CookieOptions => {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 1000, // 1 hour
  };
};

export const generateToken = (token: DecodedToken) => {
  const secret = getJwtSecret();

  return jwt.sign(token, secret, {
    expiresIn: "1h",
  });
};

export const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  return secret;
};

export const verifyToken = (token: string): DecodedToken => {
  const decoded = jwt.verify(token, getJwtSecret()) as DecodedToken;
  return decoded;
};
