import { createUser } from "../services/userService.js";
import { Role } from "../enums/role.enum.js";
import { ConflictError } from "./errors.js";

export const seedAdmin = async () => {
  const adminDto = {
    username: "admin",
    password: "Admin123!",
    email: "admin@fibank.example",
    egn: "0000000000",
    fullNameCyrillic: "Админ Админов",
    fullNameLatin: "Admin Adminov",
    phone: "0000000000",
    address: "Admin Address",
    role: Role.ADMIN,
  };

  try {
    await createUser(adminDto);
    console.log("Admin account seeded successfully.");
  } catch (err: unknown) {
    if (err instanceof ConflictError) {
      console.log("Admin already exists, skipping seed.");
    } else {
      console.error("Seed script encountered an unexpected error:", err);
    }
  }
};
