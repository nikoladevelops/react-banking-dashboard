export default interface CreateTransactionDTO {
  fromAccountNumber: string;
  toAccountNumber: string;
  title: string;
  description?: string;
  amount: number;
  currency: string;
}
