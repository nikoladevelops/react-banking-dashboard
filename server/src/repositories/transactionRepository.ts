import mongoose, { Types } from "mongoose";
import Transaction, { type ITransaction } from "../models/Transaction.js";
import Account from "../models/Account.js";
import { TransactionStatus } from "../enums/transaction.enum.js";
import { BadRequestError } from "../utils/errors.js";
import { ErrorKeys } from "../constants/errorKeys.js";

class TransactionRepository {
  async findById(id: string): Promise<ITransaction | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    return await Transaction.findById(id);
  }

  async findAllByUser(userId: string, limit = 50): Promise<ITransaction[]> {
    const accounts = await Account.find({ owner: userId }, "_id");
    const accountIds = accounts.map((acc) => acc._id);
    return await Transaction.find({
      $or: [
        { executedBy: userId },
        { fromAccount: { $in: accountIds } },
        { toAccount: { $in: accountIds } },
      ],
    })
      .sort({ transactionDate: -1 })
      .limit(limit);
  }

  async createTransaction(
    data: Omit<ITransaction, "_id" | "createdAt" | "updatedAt">,
    session?: mongoose.ClientSession,
  ): Promise<ITransaction> {
    const transaction = new Transaction(data);
    if (session) {
      return await transaction.save({ session });
    }
    return await transaction.save();
  }

  async transferBetweenAccounts(
    fromAccountId: string,
    toAccountId: string,
    amountCents: number,
    currency: string,
    reference: string | undefined,
    executedBy: Types.ObjectId,
  ): Promise<ITransaction> {
    if (amountCents <= 0) {
      throw new BadRequestError(
        "Amount must be positive",
        ErrorKeys.transactions.amountRequired,
      );
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const fromAccount = await Account.findByIdAndUpdate(
        fromAccountId,
        { $inc: { balance: -amountCents } },
        { session, new: true },
      );
      const toAccount = await Account.findByIdAndUpdate(
        toAccountId,
        { $inc: { balance: +amountCents } },
        { session, new: true },
      );

      if (!fromAccount) {
        throw new BadRequestError(
          "From account not found",
          ErrorKeys.transactions.fromAccountRequired,
        );
      }

      if (!toAccount) {
        throw new BadRequestError(
          "To account not found",
          ErrorKeys.transactions.toAccountRequired,
        );
      }

      // Create transaction
      const transaction = new Transaction({
        fromAccount: fromAccount._id,
        toAccount: toAccount._id,
        amount: amountCents,
        currency,
        status: TransactionStatus.COMPLETED,
        reference,
        transactionDate: new Date(),
        executedBy,
      });
      await transaction.save({ session });

      await session.commitTransaction();
      return transaction;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}

export default new TransactionRepository();
