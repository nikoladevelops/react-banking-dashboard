import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { AxiosError } from "axios";
import { useAccounts } from "../../hooks/useAccountHooks.js";
import { useCreateTransaction } from "../../hooks/useTransactionHooks.js";
import { type ApiResponse } from "../../types/apiResponse.js";
import { Currency } from "../../types/enums.js";

interface CreateTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface TransactionFormValues {
  fromAccountNumber: string;
  toAccountNumber: string;
  amount: number;
  currency: string;
  title: string;
  description: string;
}

type TransferMode = "internal" | "external";

export const CreateTransactionModal = ({
  isOpen,
  onClose,
}: CreateTransactionModalProps) => {
  const { t } = useTranslation();
  const { data: accounts = [] } = useAccounts(100, 0);
  const { mutate: createTransaction, isPending } = useCreateTransaction();

  const [mode, setMode] = useState<TransferMode | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedSourceAccount, setSelectedSourceAccount] =
    useState<string>("");

  const { register, handleSubmit, reset, setValue } =
    useForm<TransactionFormValues>({
      defaultValues: {
        fromAccountNumber: "",
        toAccountNumber: "",
        amount: 0,
        currency: Currency.USD,
        title: "",
        description: "",
      },
    });

  useEffect(() => {
    setValue("toAccountNumber", "");
  }, [mode, setValue]);

  const handleClose = () => {
    reset();
    setMode(null);
    setErrorMessage(null);
    setSelectedSourceAccount("");
    onClose();
  };

  const onSubmit = (data: TransactionFormValues) => {
    setErrorMessage(null);

    const selectedAccount = accounts.find(
      (acc) => acc.accountNumber === data.fromAccountNumber,
    );

    const payload = {
      fromAccountNumber: data.fromAccountNumber,
      toAccountNumber: data.toAccountNumber,
      amount: data.amount,
      currency: selectedAccount ? selectedAccount.currency : data.currency,
      title: data.title,
      description: data.description,
    };

    createTransaction(payload, {
      onSuccess: handleClose,
      onError: (err: Error) => {
        const axiosError = err as AxiosError<ApiResponse>;
        setErrorMessage(
          axiosError.response?.data?.errorCode || "transferFailed",
        );
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-custom-dark"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-6 text-xl font-bold text-gray-900 dark:text-white">
          {t("modals.transaction.title")}
        </h2>

        {!mode ? (
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setMode("internal")}
              className="rounded border p-4 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
            >
              {t("modals.transaction.myAccounts")}
            </button>
            <button
              type="button"
              onClick={() => setMode("external")}
              className="rounded border p-4 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800"
            >
              {t("modals.transaction.otherUser")}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                {t("modals.transaction.from")}
              </label>
              <select
                {...register("fromAccountNumber", {
                  required: true,
                  onChange: (e) => setSelectedSourceAccount(e.target.value),
                })}
                className="mt-1 w-full rounded border border-gray-300 p-2 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              >
                <option value="">{t("common.select")}</option>
                {accounts.map((acc) => (
                  <option key={acc.id} value={acc.accountNumber}>
                    {acc.name} ({acc.accountNumber})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                {t("modals.transaction.to")}
              </label>
              {mode === "internal" ? (
                <select
                  {...register("toAccountNumber", { required: true })}
                  className="mt-1 w-full rounded border border-gray-300 p-2 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                >
                  <option value="">{t("common.select")}</option>
                  {accounts
                    .filter((a) => a.accountNumber !== selectedSourceAccount)
                    .map((acc) => (
                      <option key={acc.id} value={acc.accountNumber}>
                        {acc.name} ({acc.accountNumber})
                      </option>
                    ))}
                </select>
              ) : (
                <input
                  {...register("toAccountNumber", { required: true })}
                  placeholder="IBAN"
                  className="mt-1 w-full rounded border border-gray-300 p-2 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                {t("modals.transaction.titleField")}
              </label>
              <input
                {...register("title", { required: true })}
                className="mt-1 w-full rounded border border-gray-300 p-2 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                {t("modals.transaction.descriptionField")}
              </label>
              <textarea
                {...register("description")}
                className="mt-1 w-full rounded border border-gray-300 p-2 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-gray-300">
                {t("modals.transaction.amount")}
              </label>
              <input
                type="number"
                step="0.01"
                {...register("amount", {
                  valueAsNumber: true,
                  required: true,
                  min: 0.01,
                })}
                className="mt-1 w-full rounded border border-gray-300 p-2 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
              />
            </div>

            {errorMessage && (
              <p className="text-sm font-semibold text-red-500">
                {t(`errors.${errorMessage}`)}
              </p>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setMode(null)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400"
              >
                {t("common.back")}
              </button>
              <button
                type="submit"
                disabled={isPending}
                className="rounded bg-blue-600 px-4 py-2 text-white disabled:bg-gray-500"
              >
                {isPending ? t("common.processing") : t("common.submit")}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
