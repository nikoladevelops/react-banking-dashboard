export default interface AccountResponseDTO {
  id: string;
  accountNumber: string;
  name: string;
  type: string;
  currency: string;
  balance: number;
  status: string;
  owner: string;
  createdAt: Date;
  updatedAt: Date;
}
