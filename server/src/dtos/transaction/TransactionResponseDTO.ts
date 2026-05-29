export default interface TransactionResponseDTO {
  id: string;
  fromAccount: string;
  toAccount: string;
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
