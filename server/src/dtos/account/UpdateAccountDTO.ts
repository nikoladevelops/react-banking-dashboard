import { AccountStatus } from "../../enums/account.enum.js";

export default interface UpdateAccountDTO {
  name?: string;
  status?: AccountStatus;
}
