import bcrypt from "bcrypt";
import mongoose, { Schema, Types } from "mongoose";
import { Role } from "../enums/role.enum.js";

export interface IUser {
  _id: Types.ObjectId;
  username: string;
  password: string; // Stored as hash
  role: Role;

  isBlocked: boolean;
  egn: string; // Personal Identification Number
  identityDoc?: string; // LNCh or Passport number only for foreigners
  fullNameCyrillic: string;
  fullNameLatin: string;
  email: string;
  phone: string;
  address: string;

  createdAt: Date;
  updatedAt: Date;
  comparePassword(enteredPassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(Role), default: Role.USER },

    isBlocked: { type: Boolean, default: false },
    egn: { type: String, required: true, unique: true, trim: true },
    identityDoc: { type: String, required: false, trim: true },
    fullNameCyrillic: { type: String, required: true, trim: true },
    fullNameLatin: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.method("comparePassword", async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
});

export default mongoose.model<IUser>("User", userSchema);
