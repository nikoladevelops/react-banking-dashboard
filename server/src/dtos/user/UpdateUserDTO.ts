export default interface UpdateUserDTO {
  username?: string;
  password?: string;
  isBlocked?: boolean;
  egn?: string;
  identityDoc?: string;
  fullNameCyrillic?: string;
  fullNameLatin?: string;
  email?: string;
  phone?: string;
  address?: string;
}
