export default interface RegisterUserDTO {
  username: string;
  password: string;
  confirmPassword: string;
  egn: string;
  identityDoc?: string;
  fullNameCyrillic: string;
  fullNameLatin: string;
  email: string;
  phone: string;
  address: string;
}
