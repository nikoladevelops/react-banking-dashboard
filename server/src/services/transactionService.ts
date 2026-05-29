import mongoose from "mongoose";
import type CreateTransactionDTO from "../dtos/transaction/CreateTransactionDTO.js";
import type { ITransaction } from "../models/Transaction.js";
import transactionRepository from "../repositories/transactionRepository.js";
import accountRepository from "../repositories/accountRepository.js";
import {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} from "../utils/errors.js";
import { ErrorKeys } from "../constants/errorKeys.js";
import { AccountStatus } from "../enums/account.enum.js";

function isValidObjectId(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id);
}

export const getTransactionByIdOrThrow = async (
  id: string,
  currentUserId: string,
): Promise<ITransaction> => {
  if (!isValidObjectId(id)) {
    throw new BadRequestError(
      "Invalid transaction ID",
      ErrorKeys.transactions.invalidId,
    );
  }

  const transaction = await transactionRepository.findById(id);
  if (!transaction) {
    throw new NotFoundError(
      "Transaction not found",
      ErrorKeys.transactions.notFound,
    );
  }

  // Authorisation: user must be executor or owner of either account
  const fromAccount = await accountRepository.findById(
    transaction.fromAccount.toString(),
  );

  const toAccount = await accountRepository.findById(
    transaction.toAccount.toString(),
  );

  const isOwner =
    (fromAccount && fromAccount.owner.toString() === currentUserId) ||
    (toAccount && toAccount.owner.toString() === currentUserId) ||
    transaction.executedBy.toString() === currentUserId;

  if (!isOwner) {
    throw new ForbiddenError("Access denied", ErrorKeys.transactions.forbidden);
  }

  return transaction;
};

export const getUserTransactions = async (
  currentUserId: string,
  limit = 50,
): Promise<ITransaction[]> => {
  return await transactionRepository.findAllByUser(currentUserId, limit);
};

export const transferMoney = async (
  dto: CreateTransactionDTO,
  currentUserId: string,
): Promise<ITransaction> => {
  if (!dto || typeof dto !== "object") {
    throw new BadRequestError(
      "Invalid request data",
      ErrorKeys.validation.invalidData,
    );
  }

  if (!dto.fromAccountId || !isValidObjectId(dto.fromAccountId)) {
    throw new BadRequestError(
      "Valid fromAccountId required",
      ErrorKeys.transactions.fromAccountRequired,
    );
  }

  if (!dto.toAccountId || !isValidObjectId(dto.toAccountId)) {
    throw new BadRequestError(
      "Valid toAccountId required",
      ErrorKeys.transactions.toAccountRequired,
    );
  }

  if (dto.fromAccountId === dto.toAccountId) {
    throw new BadRequestError(
      "Cannot transfer to same account",
      ErrorKeys.transactions.sameAccount,
    );
  }

  if (dto.amount === undefined || dto.amount === null) {
    throw new BadRequestError(
      "Amount required",
      ErrorKeys.transactions.amountRequired,
    );
  }

  if (typeof dto.amount !== "number" || dto.amount <= 0) {
    throw new BadRequestError(
      "Amount must be a positive number",
      ErrorKeys.transactions.amountPositive,
    );
  }

  const amountCents = Math.round(dto.amount * 100);

  const fromAccount = await accountRepository.findById(dto.fromAccountId);
  const toAccount = await accountRepository.findById(dto.toAccountId);
  if (!fromAccount || !toAccount) {
    throw new NotFoundError(
      "One or both accounts not found",
      ErrorKeys.transactions.accountNotFound,
    );
  }

  // Ownership check
  if (fromAccount.owner.toString() !== currentUserId) {
    throw new ForbiddenError(
      "You do not own the source account",
      ErrorKeys.transactions.forbidden,
    );
  }

  // Account status checks
  if (fromAccount.status !== AccountStatus.ACTIVE) {
    throw new BadRequestError(
      "Source account is not active",
      ErrorKeys.transactions.accountNotActive,
    );
  }

  if (toAccount.status !== AccountStatus.ACTIVE) {
    throw new BadRequestError(
      "Destination account is not active",
      ErrorKeys.transactions.accountNotActive,
    );
  }

  // Currency check
  if (fromAccount.currency !== toAccount.currency) {
    throw new BadRequestError(
      "Currency mismatch – conversion not supported",
      ErrorKeys.transactions.currencyMismatch,
    );
  }

  // Sufficient balance
  if (fromAccount.balance < amountCents) {
    throw new BadRequestError(
      "Insufficient balance",
      ErrorKeys.transactions.insufficientBalance,
    );
  }

  return await transactionRepository.transferBetweenAccounts(
    fromAccount._id.toString(),
    toAccount._id.toString(),
    amountCents,
    fromAccount.currency,
    dto.reference?.trim(),
    new mongoose.Types.ObjectId(currentUserId),
  );
};
