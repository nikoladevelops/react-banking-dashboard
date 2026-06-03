export default function CardMock({
  title = "Fibank - Checking",
  balance = "$6,421.82",
}: {
  title?: string;
  balance?: string;
}) {
  return (
    <div className="mx-auto max-w-sm transform rounded-3xl bg-white/10 dark:bg-custom-dark p-6 shadow-2xl backdrop-blur-md ring-1 ring-white/10 dark:text-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="mt-1 text-xs text-white/80">Available balance</p>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold">{balance}</div>
          <div className="text-xs text-white/80">Updated 5m ago</div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <button className="rounded-md bg-white/20 dark:bg-custom-dark px-3 py-2 text-sm hover-themed">
          Send
        </button>
        <button className="rounded-md bg-white/20 dark:bg-custom-dark px-3 py-2 text-sm hover-themed">
          Deposit
        </button>
      </div>

      <div className="mt-6 rounded-lg bg-gradient-to-r from-white/5 to-white/2 dark:bg-custom-dark p-3 dark:text-gray-200">
        <div className="text-xs text-white/80">Recent</div>
        <ul className="mt-2 text-sm space-y-2">
          <li className="flex justify-between">
            <span>Salary</span>
            <span className="font-medium">+$3,200.00</span>
          </li>
          <li className="flex justify-between text-sm text-white/80">
            <span>Groceries</span>
            <span>-$74.21</span>
          </li>
          <li className="flex justify-between text-sm text-white/80">
            <span>Utilities</span>
            <span>-$120.00</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
