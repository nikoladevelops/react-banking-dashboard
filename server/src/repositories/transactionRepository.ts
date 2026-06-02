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

  async findAllByUser(
    userId: string,
    skip?: number,
    limit?: number,
  ): Promise<ITransaction[]> {
    const userAccounts = await Account.find({ owner: userId }, "accountNumber");
    const accountNumbers = userAccounts.map((acc) => acc.accountNumber);

    let query = Transaction.find({
      $or: [
        { executedBy: userId },
        { fromAccountNumber: { $in: accountNumbers } },
        { toAccountNumber: { $in: accountNumbers } },
      ],
    }).sort({ transactionDate: -1 });

    if (skip !== undefined) query = query.skip(skip);
    if (limit !== undefined) query = query.limit(limit);

    return await query.exec();
  }

  async createTransaction(
    data: Omit<ITransaction, "_id" | "createdAt" | "updatedAt">,
    session?: mongoose.ClientSession,
  ): Promise<ITransaction> {
    const transaction = new Transaction(data);
    return session
      ? await transaction.save({ session })
      : await transaction.save();
  }

  async transferBetweenAccounts(
    fromAccountNumber: string,
    toAccountNumber: string,
    amountCents: number,
    currency: string,
    title: string,
    description: string | undefined,
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
      const fromAcc = await Account.findOneAndUpdate(
        { accountNumber: fromAccountNumber },
        { $inc: { balance: -amountCents } },
        { session, new: true },
      );

      const toAcc = await Account.findOneAndUpdate(
        { accountNumber: toAccountNumber },
        { $inc: { balance: +amountCents } },
        { session, new: true },
      );

      if (!fromAcc)
        throw new BadRequestError(
          "Source account not found",
          ErrorKeys.transactions.fromAccountRequired,
        );
      if (!toAcc)
        throw new BadRequestError(
          "Destination account not found",
          ErrorKeys.transactions.toAccountRequired,
        );

      const transaction = new Transaction({
        fromAccountNumber,
        toAccountNumber,
        title,
        description,
        amount: amountCents,
        currency,
        status: TransactionStatus.COMPLETED,
        transactionDate: new Date(),
        executedBy,
      });

      const savedTx = await transaction.save({ session });
      await session.commitTransaction();
      return savedTx;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}

export default new TransactionRepository();
