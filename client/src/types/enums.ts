export const AccountType = {
  CHECKING: "checking",
  SAVINGS: "savings",
  CURRENT: "current",
  BUSINESS: "business",
  FREE_CURRENT: "free_current",
} as const;
export type AccountType = (typeof AccountType)[keyof typeof AccountType];

export const AccountStatus = {
  ACTIVE: "active",
  FROZEN: "frozen",
  CLOSED: "closed",
} as const;
export type AccountStatus = (typeof AccountStatus)[keyof typeof AccountStatus];

export const Currency = {
  BGN: "BGN",
  EUR: "EUR",
  USD: "USD",
  GBP: "GBP",
} as const;
export type Currency = (typeof Currency)[keyof typeof Currency];

export const TransactionStatus = {
  PENDING: "pending",
  COMPLETED: "completed",
  FAILED: "failed",
  REJECTED: "rejected",
} as const;
export type TransactionStatus =
  (typeof TransactionStatus)[keyof typeof TransactionStatus];
