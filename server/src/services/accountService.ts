import mongoose from "mongoose";
import type CreateAccountDTO from "../dtos/account/CreateAccountDTO.js";
import type UpdateAccountDTO from "../dtos/account/UpdateAccountDTO.js";
import type { IAccount } from "../models/Account.js";
import accountRepository from "../repositories/accountRepository.js";
import {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
} from "../utils/errors.js";
import { ErrorKeys } from "../constants/errorKeys.js";
import { AccountType, AccountStatus } from "../enums/account.enum.js";
import { Currency } from "../enums/currency.enum.js";

function isValidObjectId(id: string): boolean {
  return mongoose.Types.ObjectId.isValid(id);
}

export const getAccountByIdOrThrow = async (
  id: string,
  currentUserId: string,
): Promise<IAccount> => {
  if (!isValidObjectId(id)) {
    throw new BadRequestError(
      "Invalid account ID",
      ErrorKeys.accounts.invalidId,
    );
  }

  if (!isValidObjectId(currentUserId)) {
    throw new BadRequestError(
      "Invalid user ID",
      ErrorKeys.accounts.invalidOwnerId,
    );
  }

  const account = await accountRepository.findById(id);
  if (!account) {
    throw new NotFoundError("Account not found", ErrorKeys.accounts.notFound);
  }

  if (account.owner.toString() !== currentUserId) {
    throw new ForbiddenError("Access denied", ErrorKeys.accounts.forbidden);
  }

  return account;
};

export const getUserAccounts = async (
  currentUserId: string,
  skip: number,
  limit: number,
): Promise<IAccount[]> => {
  if (!isValidObjectId(currentUserId)) {
    throw new BadRequestError(
      "Invalid user ID",
      ErrorKeys.accounts.invalidOwnerId,
    );
  }

  return await accountRepository.findAllByOwner(currentUserId, skip, limit);
};

export const createAccount = async (
  dto: CreateAccountDTO,
  currentUserId: string,
): Promise<IAccount> => {
  if (!dto || typeof dto !== "object") {
    throw new BadRequestError(
      "Invalid request data",
      ErrorKeys.validation.invalidData,
    );
  }

  if (!currentUserId || !isValidObjectId(currentUserId)) {
    throw new BadRequestError(
      "Invalid user ID",
      ErrorKeys.accounts.invalidOwnerId,
    );
  }

  if (!dto.name?.trim()) {
    throw new BadRequestError(
      "Account name required",
      ErrorKeys.accounts.nameRequired,
    );
  }

  if (!dto.type || !Object.values(AccountType).includes(dto.type)) {
    throw new BadRequestError(
      "Invalid account type",
      ErrorKeys.accounts.typeInvalid,
    );
  }

  if (!dto.currency || !Object.values(Currency).includes(dto.currency)) {
    throw new BadRequestError(
      "Invalid currency",
      ErrorKeys.accounts.currencyInvalid,
    );
  }

  let initialDepositCents = 0;
  if (dto.initialDeposit !== undefined) {
    if (typeof dto.initialDeposit !== "number" || dto.initialDeposit < 0) {
      throw new BadRequestError(
        "Initial deposit must be a non-negative number",
        ErrorKeys.accounts.initialDepositInvalid,
      );
    }
    initialDepositCents = Math.round(dto.initialDeposit * 100);
  }

  const createData = {
    name: dto.name.trim(),
    type: dto.type,
    currency: dto.currency,
    balance: initialDepositCents,
    owner: new mongoose.Types.ObjectId(currentUserId),
  };

  return await accountRepository.createAccount(createData);
};

export const updateAccount = async (
  id: string,
  dto: UpdateAccountDTO,
  currentUserId: string,
): Promise<IAccount> => {
  if (!dto || typeof dto !== "object") {
    throw new BadRequestError(
      "Invalid request data",
      ErrorKeys.validation.invalidData,
    );
  }

  await getAccountByIdOrThrow(id, currentUserId);

  if (dto.name !== undefined && !dto.name.trim()) {
    throw new BadRequestError(
      "Name cannot be empty",
      ErrorKeys.accounts.nameRequired,
    );
  }

  if (
    dto.status !== undefined &&
    !Object.values(AccountStatus).includes(dto.status)
  ) {
    throw new BadRequestError("Invalid status", ErrorKeys.accounts.typeInvalid);
  }

  const updated = await accountRepository.updateAccount(id, dto);
  if (!updated) {
    throw new NotFoundError("Account not found", ErrorKeys.accounts.notFound);
  }
  return updated;
};

export const deleteAccount = async (
  id: string,
  currentUserId: string,
): Promise<IAccount> => {
  const account = await getAccountByIdOrThrow(id, currentUserId);

  if (account.balance !== 0) {
    throw new BadRequestError(
      "Cannot delete account with non-zero balance",
      ErrorKeys.accounts.cannotDeleteNonZero,
    );
  }

  const deleted = await accountRepository.deleteAccount(id);
  if (!deleted) {
    throw new NotFoundError("Account not found", ErrorKeys.accounts.notFound);
  }
  return deleted;
};
