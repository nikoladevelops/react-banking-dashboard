import User, { type IUser } from "../models/User.js";
import type CreateUserDTO from "../dtos/user/CreateUserDTO.js";
import type UpdateUserDTO from "../dtos/user/UpdateUserDTO.js";
import type { UserSearchFiltersDTO } from "../dtos/user/UserSearchFiltersDTO.js";
import { BadRequestError, NotFoundError } from "../utils/errors.js";
import { ErrorKeys } from "../constants/errorKeys.js";

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

  async findUsers(filters: UserSearchFiltersDTO): Promise<IUser[]> {
    const query: any = {};

    if (filters.username) {
      query.username = {
        $regex: filters.username,
        $options: "i",
      };
    }

    if (filters.email) {
      query.email = {
        $regex: filters.email,
        $options: "i",
      };
    }

    if (filters.egn) {
      query.egn = {
        $regex: filters.egn,
        $options: "i",
      };
    }

    if (filters.fullNameCyrillic) {
      query.fullNameCyrillic = {
        $regex: filters.fullNameCyrillic,
        $options: "i",
      };
    }

    if (filters.fullNameLatin) {
      query.fullNameLatin = {
        $regex: filters.fullNameLatin,
        $options: "i",
      };
    }

    if (filters.role) {
      query.role = {
        $regex: filters.role,
        $options: "i",
      };
    }

    if (filters.isBlocked !== undefined) {
      query.isBlocked = filters.isBlocked;
    }

    return await User.find(query);
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

  async blockUserByUsername(username: string): Promise<IUser> {
    const user = await User.findOne({ username });
    if (!user) {
      throw new NotFoundError("User not found", ErrorKeys.users.userNotFound);
    }

    if (user.isBlocked) {
      throw new BadRequestError(
        "User is already blocked",
        ErrorKeys.users.userAlreadyBlocked,
      );
    }

    await User.updateOne({ username }, { $set: { isBlocked: true } });

    user.isBlocked = true;
    return user;
  }

  async unblockUserByUsername(username: string): Promise<IUser> {
    const user = await User.findOne({ username });
    if (!user) {
      throw new NotFoundError("User not found", ErrorKeys.users.userNotFound);
    }

    if (!user.isBlocked) {
      throw new BadRequestError(
        "User is already active",
        ErrorKeys.users.userAlreadyActive,
      );
    }

    await User.updateOne({ username }, { $set: { isBlocked: false } });

    user.isBlocked = false;
    return user;
  }
}

export default new UserRepository();
