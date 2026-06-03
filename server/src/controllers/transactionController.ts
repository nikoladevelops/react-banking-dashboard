import { type Request, type Response } from "express";
import * as transactionService from "../services/transactionService.js";
import { successResponse } from "../utils/response.js";
import { UnauthorizedError } from "../utils/errors.js";
import { ErrorKeys } from "../constants/errorKeys.js";
import type { ITransaction } from "../models/Transaction.js";
import type TransactionResponseDTO from "../dtos/transaction/TransactionResponseDTO.js";

function toTransactionResponseDTO(tx: ITransaction): TransactionResponseDTO {
  const dto: TransactionResponseDTO = {
    id: tx._id.toString(),
    fromAccountNumber: tx.fromAccountNumber,
    toAccountNumber: tx.toAccountNumber,
    title: tx.title,
    amount: tx.amount,
    currency: tx.currency,
    status: tx.status,
    transactionDate: tx.transactionDate,
    executedBy: tx.executedBy.toString(),
    createdAt: tx.createdAt,
    updatedAt: tx.updatedAt,
  };

  if (tx.approvedBy) dto.approvedBy = tx.approvedBy.toString();
  if (tx.description) dto.description = tx.description;
  return dto;
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

export const getTransactionHistory = async (req: Request, res: Response) => {
  const currentUserId = getCurrentUserId(req);
  const limit = parseInt(req.query.limit as string) || 5;
  const skip = parseInt(req.query.offset as string) || 0;

  const transactions = await transactionService.getUserTransactions(
    currentUserId,
    skip,
    limit,
  );

  const response = transactions.map(toTransactionResponseDTO);
  res.status(200).json(successResponse(response));
};

export const getTransactionById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const currentUserId = getCurrentUserId(req);
  const transaction = await transactionService.getTransactionByIdOrThrow(
    req.params.id,
    currentUserId,
  );

  const response = toTransactionResponseDTO(transaction);
  res.status(200).json(successResponse(response));
};

export const createTransaction = async (req: Request, res: Response) => {
  const currentUserId = getCurrentUserId(req);

  const transaction = await transactionService.transferMoney(
    req.body,
    currentUserId,
  );

  const response = toTransactionResponseDTO(transaction);
  res.status(201).json(successResponse(response));
};
