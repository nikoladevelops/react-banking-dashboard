import User, { type IUser } from "../models/User.js";

export const createUser = async (
  username: string,
  password: string,
): Promise<IUser> => {
  const user = new User({ username, password });
  await user.save();
  return user;
};

export const getAllUsers = async (): Promise<IUser[]> => {
  const users = await User.find();

  return users;
};

export const getUserById = async (id: string): Promise<IUser | null> => {
  const user = await User.findById(id);
  return user;
};

export const updateUser = async (
  id: string,
  username?: string,
  password?: string,
): Promise<IUser | null> => {
  const updateData: any = {};

  if (username !== undefined) {
    updateData.username = username;
  }

  if (password !== undefined) {
    updateData.password = password;
  }

  const user = await User.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
  return user;
};

export const deleteUser = async (id: string): Promise<boolean> => {
  const result = await User.findByIdAndDelete(id);
  const deleted = !!result;
  return deleted;
};
