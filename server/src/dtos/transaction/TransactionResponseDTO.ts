export default interface TransactionResponseDTO {
  id: string;
  fromAccountNumber: string;
  toAccountNumber: string;
  title: string;
  description?: string;
  amount: number;
  currency: string;
  status: string;
  transactionDate: Date;
  executedBy: string;
  approvedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}
