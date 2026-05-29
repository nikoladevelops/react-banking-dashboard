export default interface CreateTransactionDTO {
  fromAccountId: string;
  toAccountId: string;
  amount: number; // in major units (e.g., 100.50)
  reference?: string;
}
