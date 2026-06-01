import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useAccounts, useDeleteAccount } from "../../hooks/useAccountHooks.js";
import { CreateAccountModal } from "../modals/CreateAccountModal";
import { EditAccountModal } from "../modals/EditAccountModal";
import { ConfirmationModal } from "../modals/ConfirmationModal";

export const Accounts = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [accountToEdit, setAccountToEdit] = useState(null);
  const [accountToDelete, setAccountToDelete] = useState<string | null>(null);

  const limit = 2;
  const offset = page * limit;
  const queryClient = useQueryClient();

  const {
    data: rawAccounts = [],
    isLoading,
    error,
    refetch,
  } = useAccounts(limit + 1, offset);
  const deleteMutation = useDeleteAccount();

  const accounts = rawAccounts.slice(0, limit);
  const hasNextPage = rawAccounts.length === limit + 1;

  const handleDeleteConfirm = async () => {
    if (!accountToDelete) return;
    await deleteMutation.mutateAsync(accountToDelete);
    queryClient.invalidateQueries({ queryKey: ["accounts"] });
    if (accounts.length === 1 && page > 0) setPage(page - 1);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        {t("common.processing")}
      </div>
    );
  if (error)
    return (
      <div className="p-4 text-red-600">
        {t("errors.server.internalServerError")}: {(error as Error).message}{" "}
        <button onClick={() => refetch()} className="underline">
          Retry
        </button>
      </div>
    );

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          {t("dashboard.accounts.title")}
        </h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          + {t("dashboard.accounts.newAccount")}
        </button>
      </div>

      <CreateAccountModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
      <EditAccountModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        account={accountToEdit}
      />
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="modals.deleteAccount.title"
        message="modals.deleteAccount.message"
      />

      <div className="space-y-4">
        {accounts.map((account) => (
          <div
            key={account.id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-custom-dark shadow-sm"
          >
            <div className="flex justify-between items-start flex-wrap gap-4">
              <div>
                <h2 className="text-xl font-semibold dark:text-white">
                  {account.name}
                </h2>
                <p className="text-sm dark:text-gray-400">
                  {t("dashboard.accounts.accountNumber")}{" "}
                  {account.accountNumber}
                </p>
                <p className="text-sm dark:text-gray-400">
                  {t("dashboard.accounts.type")} {account.type}
                </p>
                <p className="text-sm dark:text-gray-400">
                  {t("dashboard.accounts.status")} {account.status}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                  {(account.balance / 100).toFixed(2)} {account.currency}
                </p>
                <div className="mt-2 flex justify-end gap-2">
                  <button
                    onClick={() => {
                      setAccountToEdit(account);
                      setIsEditModalOpen(true);
                    }}
                    className="text-yellow-600 hover:text-yellow-700 font-medium px-3 py-1 rounded"
                  >
                    {t("dashboard.accounts.edit")}
                  </button>
                  <button
                    onClick={() => {
                      setAccountToDelete(account.id);
                      setIsDeleteModalOpen(true);
                    }}
                    className="text-red-600 hover:text-red-700 font-medium px-3 py-1 rounded"
                  >
                    {t("dashboard.accounts.delete")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 mt-8">
        <button
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded font-medium disabled:opacity-50 transition-opacity"
        >
          {t("dashboard.accounts.previous")}
        </button>
        <span className="text-gray-700 dark:text-gray-300 font-medium">
          {t("dashboard.accounts.page")} {page + 1}
        </span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={!hasNextPage}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded font-medium disabled:opacity-50 transition-opacity"
        >
          {t("dashboard.accounts.next")}
        </button>
      </div>
    </div>
  );
};
