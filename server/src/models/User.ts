import bcrypt from "bcrypt";
import mongoose, { Schema, Types } from "mongoose";
import { Role } from "../enums/role.enum.js";

export interface IUser {
  _id: Types.ObjectId;
  username: string;
  password: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(enteredPassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(Role), default: Role.USER },
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
