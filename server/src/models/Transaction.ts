import mongoose, { Schema, Types } from "mongoose";
import { TransactionStatus } from "../enums/transaction.enum.js";
import { Currency } from "../enums/currency.enum.js";

export interface ITransaction {
  _id: Types.ObjectId;
  fromAccountNumber: string;
  toAccountNumber: string;
  title: string;
  description?: string;
  amount: number; // in cents
  currency: Currency;
  status: TransactionStatus;
  transactionDate: Date;
  executedBy: Types.ObjectId;
  approvedBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const transactionSchema = new Schema<ITransaction>(
  {
    fromAccountNumber: { type: String, required: true, index: true },
    toAccountNumber: { type: String, required: true, index: true },
    title: { type: String, required: true, trim: true, maxlength: 100 },
    description: { type: String, trim: true, maxlength: 500 },
    amount: { type: Number, required: true, min: 1 },
    currency: { type: String, enum: Object.values(Currency), required: true },
    status: {
      type: String,
      enum: Object.values(TransactionStatus),
      default: TransactionStatus.PENDING,
    },
    transactionDate: { type: Date, default: Date.now },
    executedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    approvedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

transactionSchema.index({ fromAccountNumber: 1, transactionDate: -1 });
transactionSchema.index({ toAccountNumber: 1, transactionDate: -1 });
transactionSchema.index({ executedBy: 1 });

export default mongoose.model<ITransaction>("Transaction", transactionSchema);
