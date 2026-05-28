import mongoose, { Schema, Types } from "mongoose";
import { AccountType, AccountStatus } from "../enums/account.enum.js";
import { Currency } from "../enums/currency.enum.js";
import { randomBytes } from "crypto";

export interface IAccount {
  _id: Types.ObjectId;
  accountNumber: string;
  name: string;
  type: AccountType;
  currency: Currency;
  balance: number; // in cents
  status: AccountStatus;
  owner: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const accountSchema = new Schema<IAccount>(
  {
    accountNumber: { type: String, unique: true },
    name: { type: String, required: true },
    type: { type: String, enum: Object.values(AccountType), required: true },
    currency: {
      type: String,
      enum: Object.values(Currency),
      required: true,
      default: Currency.BGN,
    },
    balance: { type: Number, required: true, default: 0, min: 0 },
    status: {
      type: String,
      enum: Object.values(AccountStatus),
      default: AccountStatus.ACTIVE,
    },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

accountSchema.pre("save", async function () {
  if (!this.accountNumber) {
    const randomBytesBuffer = randomBytes(8);
    const randomHex = randomBytesBuffer.toString("hex").toUpperCase();
    this.accountNumber = `BG${randomHex}`;
  }
});

export default mongoose.model<IAccount>("Account", accountSchema);
