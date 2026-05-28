import { AccountType } from "../../enums/account.enum.js";
import { Currency } from "../../enums/currency.enum.js";

export default interface CreateAccountDTO {
  name: string;
  type: AccountType;
  currency: Currency;
  initialDeposit?: number;
}
