import User, { type IUser } from "../models/User.js";
import type CreateUserDTO from "../dtos/user/CreateUserDTO.js";
import type UpdateUserDTO from "../dtos/user/UpdateUserDTO.js";

class UserRepository {
  async getAllUsers(): Promise<IUser[]> {
    return await User.find();
  }

  async findById(id: string): Promise<IUser | null> {
    return await User.findById(id);
  }

  async findByUsername(username: string): Promise<IUser | null> {
    return await User.findOne({ username });
  }

  async createUser(userData: CreateUserDTO): Promise<IUser> {
    const user = new User(userData);
    await user.save();
    return user;
  }

  async updateUser(
    id: string,
    updateData: UpdateUserDTO,
  ): Promise<IUser | null> {
    const user = await User.findById(id);
    if (!user) {
      return null;
    }

    if (updateData.username !== undefined) {
      user.username = updateData.username;
    }
    if (updateData.password !== undefined) {
      user.password = updateData.password;
    }

    await user.save();
    return user;
  }

  async deleteUser(id: string): Promise<IUser | null> {
    return await User.findByIdAndDelete(id);
  }
}

export default new UserRepository();
