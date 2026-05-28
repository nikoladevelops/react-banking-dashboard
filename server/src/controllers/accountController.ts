import { type Request, type Response } from "express";
import * as accountService from "../services/accountService.js";
import { successResponse } from "../utils/response.js";
import { UnauthorizedError } from "../utils/errors.js";
import { ErrorKeys } from "../constants/errorKeys.js";
import type { IAccount } from "../models/Account.js";
import type AccountResponseDTO from "../dtos/account/AccountResponseDTO.js";

function toAccountResponseDTO(account: IAccount): AccountResponseDTO {
  return {
    id: account._id.toString(),
    accountNumber: account.accountNumber,
    name: account.name,
    type: account.type,
    currency: account.currency,
    balance: account.balance,
    status: account.status,
    owner: account.owner.toString(),
    createdAt: account.createdAt,
    updatedAt: account.updatedAt,
  };
}

function getCurrentUserId(req: Request): string {
  const user = (req as any).user;
  if (!user || !user.id) {
    throw new UnauthorizedError(
      "Authentication required",
      ErrorKeys.auth.tokenMissing,
    );
  }
  return user.id;
}

export const getMyAccounts = async (req: Request, res: Response) => {
  const currentUserId = getCurrentUserId(req);
  const accounts = await accountService.getUserAccounts(currentUserId);
  const response = accounts.map(toAccountResponseDTO);
  res.status(200).json(successResponse(response));
};

export const getAccountById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const currentUserId = getCurrentUserId(req);
  const account = await accountService.getAccountByIdOrThrow(
    req.params.id,
    currentUserId,
  );
  const response = toAccountResponseDTO(account);
  res.status(200).json(successResponse(response));
};

export const createAccount = async (req: Request, res: Response) => {
  const currentUserId = getCurrentUserId(req);
  const account = await accountService.createAccount(req.body, currentUserId);
  const response = toAccountResponseDTO(account);
  res.status(201).json(successResponse(response));
};

export const updateAccount = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const currentUserId = getCurrentUserId(req);
  const account = await accountService.updateAccount(
    req.params.id,
    req.body,
    currentUserId,
  );
  const response = toAccountResponseDTO(account);
  res.status(200).json(successResponse(response));
};

export const deleteAccount = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const currentUserId = getCurrentUserId(req);
  const account = await accountService.deleteAccount(
    req.params.id,
    currentUserId,
  );
  const response = toAccountResponseDTO(account);
  res.status(200).json(successResponse(response));
};
