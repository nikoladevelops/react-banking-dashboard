import Account, { type IAccount } from "../models/Account.js";
import type CreateAccountDTO from "../dtos/account/CreateAccountDTO.js";
import type UpdateAccountDTO from "../dtos/account/UpdateAccountDTO.js";
import mongoose from "mongoose";
import { AccountStatus } from "../enums/account.enum.js";

class AccountRepository {
  async findById(id: string): Promise<IAccount | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return await Account.findById(id);
  }

  async findByAccountNumber(accountNumber: string): Promise<IAccount | null> {
    return await Account.findOne({ accountNumber });
  }

  async findAllByOwner(
    ownerId: string,
    skip?: number,
    limit?: number,
  ): Promise<IAccount[]> {
    let query = Account.find({ owner: ownerId });

    if (skip !== undefined) {
      query = query.skip(skip);
    }

    if (limit !== undefined) {
      query = query.limit(limit);
    }

    return await query.exec();
  }

  async createAccount(
    data: CreateAccountDTO & {
      owner: mongoose.Types.ObjectId;
      balance: number;
    },
  ): Promise<IAccount> {
    const account = new Account({
      ...data,
      status: AccountStatus.ACTIVE,
    });

    await account.save();
    return account;
  }

  async updateAccount(
    id: string,
    updateData: UpdateAccountDTO,
  ): Promise<IAccount | null> {
    return await Account.findByIdAndUpdate(id, updateData, {
      returnDocument: "after",
    });
  }

  async deleteAccount(id: string): Promise<IAccount | null> {
    return await Account.findByIdAndDelete(id);
  }
}

export default new AccountRepository();
