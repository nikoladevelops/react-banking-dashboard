import type { Role } from "../../enums/role.enum.js";

export interface UserSearchFiltersDTO {
  username?: string;
  email?: string;
  egn?: string;
  fullNameCyrillic?: string;
  fullNameLatin?: string;
  role?: Role;
  isBlocked?: boolean;
}
