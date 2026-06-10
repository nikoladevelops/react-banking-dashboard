import type { Role } from "../enums/role.enum.js";

export interface UserContext {
  id: string;
  username: string;
  role: Role;
}
