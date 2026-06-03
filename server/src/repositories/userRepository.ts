import User, { type IUser } from "../models/User.js";
import type CreateUserDTO from "../dtos/user/CreateUserDTO.js";
import type UpdateUserDTO from "../dtos/user/UpdateUserDTO.js";

class UserRepository {
  async getAllUsers(): Promise<IUser[]> {
    return await User.find().lean();
  }

  async findById(id: string): Promise<IUser | null> {
    return await User.findById(id).lean();
  }

  async findByUsername(username: string): Promise<IUser | null> {
    return await User.findOne({ username });
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }

  async createUser(userData: CreateUserDTO): Promise<IUser> {
    const user = new User(userData);
    return await user.save();
  }

  async updateUser(
    id: string,
    updateData: UpdateUserDTO,
  ): Promise<IUser | null> {
    const user = await User.findById(id);

    if (!user) {
      return null;
    }

    (Object.keys(updateData) as Array<keyof UpdateUserDTO>).forEach((key) => {
      const value = updateData[key];
      if (value !== undefined) {
        (user as any)[key] = value;
      }
    });

    return await user.save();
  }

  async deleteUser(id: string): Promise<IUser | null> {
    return await User.findByIdAndDelete(id);
  }
}

export default new UserRepository();
