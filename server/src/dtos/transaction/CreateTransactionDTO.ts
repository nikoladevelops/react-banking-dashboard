export default interface CreateTransactionDTO {
  fromAccountNumber: string;
  toAccountNumber: string;
  amount: number;
  currency: string;
  reference?: string;
}
