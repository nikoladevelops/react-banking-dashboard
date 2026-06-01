import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { AxiosError } from "axios";
import { useUpdateAccount } from "../../hooks/useAccountHooks.js";
import { type ApiResponse } from "../../types/apiResponse.js";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  account: { id: string; name: string; type: string; currency: string } | null;
}

export const EditAccountModal = ({
  isOpen,
  onClose,
  account,
}: EditModalProps) => {
  const { t } = useTranslation();
  const { mutate: updateAccount, isPending } = useUpdateAccount();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { register, handleSubmit, reset } = useForm<{ name: string }>();

  useEffect(() => {
    if (account) reset({ name: account.name });
  }, [account, reset]);

  if (!isOpen || !account) return null;

  const onSubmit = (data: { name: string }) => {
    setErrorMessage(null);
    updateAccount(
      { id: account.id, updates: { name: data.name } },
      {
        onSuccess: onClose,
        onError: (error: Error) => {
          const axiosError = error as AxiosError<ApiResponse>;
          setErrorMessage(axiosError.response?.data?.errorCode || "unexpected");
        },
      },
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-lg bg-white dark:bg-custom-dark p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          {t("modals.editAccount.title")}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white">
              {t("modals.editAccount.name")}
            </label>
            <input
              {...register("name", { required: true })}
              className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                {t("modals.editAccount.type")}
              </label>
              <input
                disabled
                value={account.type}
                className="mt-1 w-full rounded-md border border-gray-300 p-2 bg-gray-100 dark:bg-gray-900 text-gray-500 cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                {t("modals.editAccount.currency")}
              </label>
              <input
                disabled
                value={account.currency}
                className="mt-1 w-full rounded-md border border-gray-300 p-2 bg-gray-100 dark:bg-gray-900 text-gray-500 cursor-not-allowed"
              />
            </div>
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm font-semibold mt-2">
              {t(`errors.${errorMessage}`)}
            </p>
          )}
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded px-4 py-2 text-gray-600 dark:text-gray-300"
            >
              {t("common.cancel")}
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="rounded bg-blue-600 px-4 py-2 text-white disabled:bg-gray-400"
            >
              {isPending ? t("common.saving") : t("modals.editAccount.submit")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
