import { Accounts } from "./Accounts";
import { Transactions } from "./Transactions";

export default function UserDashboard() {
  return (
    <div className="flex flex-col items-center w-full max-w-200">
      <Accounts />
      <Transactions />
    </div>
  );
}
