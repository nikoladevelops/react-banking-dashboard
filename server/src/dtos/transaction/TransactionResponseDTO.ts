export default interface TransactionResponseDTO {
  id: string;
  fromAccountNumber: string;
  toAccountNumber: string;
  amount: number;
  currency: string;
  status: string;
  reference?: string;
  transactionDate: Date;
  executedBy: string;
  approvedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}
