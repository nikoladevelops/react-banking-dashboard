import mongoose, { Schema, Types } from "mongoose";
import { TransactionStatus } from "../enums/transaction.enum.js";
import { Currency } from "../enums/currency.enum.js";

export interface ITransaction {
  _id: Types.ObjectId;
  fromAccount: Types.ObjectId;
  toAccount: Types.ObjectId;
  amount: number; // in cents
  currency: Currency;
  status: TransactionStatus;
  reference?: string;
  transactionDate: Date;
  executedBy: Types.ObjectId;
  approvedBy?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const transactionSchema = new Schema<ITransaction>(
  {
    fromAccount: {
      type: Schema.Types.ObjectId,
      ref: "Account",
      required: true,
    },
    toAccount: { type: Schema.Types.ObjectId, ref: "Account", required: true },
    amount: { type: Number, required: true, min: 1 },
    currency: { type: String, enum: Object.values(Currency), required: true },
    status: {
      type: String,
      enum: Object.values(TransactionStatus),
      default: TransactionStatus.PENDING,
    },
    reference: { type: String, maxlength: 200 },
    transactionDate: { type: Date, default: Date.now },
    executedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    approvedBy: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true },
);

// Indexes for performance
transactionSchema.index({ fromAccount: 1, transactionDate: -1 });
transactionSchema.index({ toAccount: 1, transactionDate: -1 });
transactionSchema.index({ executedBy: 1 });

export default mongoose.model<ITransaction>("Transaction", transactionSchema);
