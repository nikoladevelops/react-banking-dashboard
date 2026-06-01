import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import type { AxiosError } from "axios";
import { useCreateAccount } from "../../hooks/useAccountHooks.js";
import { type ApiResponse } from "../../types/apiResponse.js";
import { AccountType, Currency } from "../../types/enums.js";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormValues {
  name: string;
  type: string;
  currency: string;
  initialDeposit: number;
}

export const CreateAccountModal = ({ isOpen, onClose }: ModalProps) => {
  const { t } = useTranslation();
  const { mutate: createAccount, isPending } = useCreateAccount();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { register, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      name: "",
      type: AccountType.SAVINGS,
      currency: Currency.USD,
      initialDeposit: 0,
    },
  });

  const handleClose = () => {
    reset();
    setErrorMessage(null);
    onClose();
  };

  if (!isOpen) return null;

  const onSubmit = (data: FormValues) => {
    setErrorMessage(null);
    createAccount(
      { ...data, initialDeposit: Number(data.initialDeposit) },
      {
        onSuccess: handleClose,
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
      onClick={handleClose}
    >
      <div
        className="w-full max-w-md rounded-lg bg-white dark:bg-custom-dark p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          {t("modals.createAccount.title")}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white">
              {t("modals.createAccount.name")}
            </label>
            <input
              {...register("name", { required: true })}
              className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                {t("modals.createAccount.type")}
              </label>
              <select
                {...register("type")}
                className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                {Object.values(AccountType).map((val) => (
                  <option key={val} value={val}>
                    {val.charAt(0).toUpperCase() + val.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 dark:text-white">
                {t("modals.createAccount.currency")}
              </label>
              <select
                {...register("currency")}
                className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                {Object.values(Currency).map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 dark:text-white">
              {t("modals.createAccount.deposit")}
            </label>
            <input
              type="number"
              step="0.01"
              {...register("initialDeposit", { valueAsNumber: true })}
              className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 p-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm font-semibold mt-2">
              {t(`errors.${errorMessage}`)}
            </p>
          )}
          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="rounded px-4 py-2 text-gray-600 dark:text-gray-300"
            >
              {t("common.cancel")}
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="rounded bg-blue-600 px-4 py-2 text-white disabled:bg-gray-400"
            >
              {isPending
                ? t("common.creating")
                : t("modals.createAccount.submit")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
