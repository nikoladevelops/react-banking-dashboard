import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTransactions } from "../../hooks/useTransactionHooks.js";
import { CreateTransactionModal } from "../modals/CreateTransactionModal.js";

export const Transactions = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const limit = 5;
  const offset = page * limit;

  const {
    data: rawTransactions = [],
    isLoading,
    error,
    refetch,
  } = useTransactions(limit + 1, offset);

  const transactions = rawTransactions.slice(0, limit);
  const hasNextPage = rawTransactions.length === limit + 1;

  if (isLoading)
    return (
      <div className="flex h-64 items-center justify-center text-gray-500">
        {t("common.processing")}
      </div>
    );

  if (error)
    return (
      <div className="p-4 text-red-600">
        {t("errors.server.internalServerError")}: {(error as Error).message}
        <button onClick={() => refetch()} className="underline">
          {t("common.retry")}
        </button>
      </div>
    );

  return (
    <div className="w-full">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          {t("dashboard.transactions.title")}
        </h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700"
        >
          + {t("dashboard.transactions.newTransaction")}
        </button>
      </div>

      <CreateTransactionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />

      <div className="space-y-4">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 className="font-semibold text-gray-900 dark:text-white">
                  {tx.reference || t("dashboard.transactions.noReference")}
                </h2>
                <p className="text-sm dark:text-gray-400">
                  {t("dashboard.transactions.from")}: {tx.fromAccountNumber}
                </p>
                <p className="text-sm dark:text-gray-400">
                  {t("dashboard.transactions.to")}: {tx.toAccountNumber}
                </p>
                <p className="text-xs text-gray-500">
                  {new Date(tx.transactionDate).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {(tx.amount / 100).toFixed(2)} {tx.currency}
                </p>
                <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {tx.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          className="rounded bg-gray-200 px-4 py-2 font-medium text-gray-800 transition-opacity disabled:opacity-50 dark:bg-gray-700 dark:text-white"
        >
          {t("dashboard.transactions.previous")}
        </button>
        <span className="font-medium text-gray-700 dark:text-gray-300">
          {t("dashboard.transactions.page")} {page + 1}
        </span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={!hasNextPage}
          className="rounded bg-gray-200 px-4 py-2 font-medium text-gray-800 transition-opacity disabled:opacity-50 dark:bg-gray-700 dark:text-white"
        >
          {t("dashboard.transactions.next")}
        </button>
      </div>
    </div>
  );
};
