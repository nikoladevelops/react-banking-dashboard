export default interface CreateUserDTO {
  username: string;
  password: string;
  egn: string;
  identityDoc?: string;
  fullNameCyrillic: string;
  fullNameLatin: string;
  email: string;
  phone: string;
  address: string;
}
