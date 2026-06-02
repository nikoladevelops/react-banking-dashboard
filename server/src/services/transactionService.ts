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
  skip?: number,
  limit?: number,
): Promise<ITransaction[]> => {
  return await transactionRepository.findAllByUser(currentUserId, skip, limit);
};

const normalize = (val: string) => val.trim().toUpperCase();

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

  if (!dto.fromAccountNumber || !dto.toAccountNumber) {
    throw new BadRequestError(
      "Both account numbers are required",
      ErrorKeys.transactions.fromAccountRequired,
    );
  }

  const fromNumber = normalize(dto.fromAccountNumber);
  const toNumber = normalize(dto.toAccountNumber);

  if (fromNumber === toNumber) {
    throw new BadRequestError(
      "Cannot transfer to same account",
      ErrorKeys.transactions.transferToSameAccountImpossible,
    );
  }

  if (typeof dto.amount !== "number" || dto.amount <= 0) {
    throw new BadRequestError(
      "Amount must be a positive number",
      ErrorKeys.transactions.amountHasToBePositive,
    );
  }

  const amountCents = Math.round(dto.amount * 100);

  const fromAccount = await accountRepository.findByAccountNumber(fromNumber);
  const toAccount = await accountRepository.findByAccountNumber(toNumber);

  if (!fromAccount || !toAccount) {
    throw new NotFoundError(
      "One or both accounts not found",
      ErrorKeys.transactions.accountNotFound,
    );
  }

  if (fromAccount.owner.toString() !== currentUserId) {
    throw new ForbiddenError(
      "You do not own the source account",
      ErrorKeys.transactions.forbidden,
    );
  }

  if (
    fromAccount.status !== AccountStatus.ACTIVE ||
    toAccount.status !== AccountStatus.ACTIVE
  ) {
    throw new BadRequestError(
      "One or both accounts are not active",
      ErrorKeys.transactions.accountNotActive,
    );
  }

  if (fromAccount.currency !== toAccount.currency) {
    throw new BadRequestError(
      "Currency mismatch – conversion not supported",
      ErrorKeys.transactions.currencyConversionImpossible,
    );
  }

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
