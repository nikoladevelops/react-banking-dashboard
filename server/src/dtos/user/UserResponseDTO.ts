export default interface UserResponseDTO {
  id: string;
  username: string;
  email: string;
  egn: string;
  identityDoc?: string;
  fullNameCyrillic: string;
  fullNameLatin: string;
  isBlocked: boolean;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
