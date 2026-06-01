import { useState } from "react";
import { useTranslation } from "react-i18next";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  title: string;
  message: string;
}

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}: ConfirmationModalProps) => {
  const { t } = useTranslation();
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleClose = () => {
    setErrorMessage(null);
    setIsPending(false);
    onClose();
  };

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setErrorMessage(null);
    setIsPending(true);
    try {
      await onConfirm();
      handleClose();
    } catch (err) {
      setErrorMessage(err.response?.data?.errorCode || "unexpected");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-sm rounded-lg bg-white dark:bg-custom-dark p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
          {t(title)}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{t(message)}</p>

        {errorMessage && (
          <p className="text-red-500 text-sm font-semibold mb-4">
            {t(`errors.${errorMessage}`)}
          </p>
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={handleClose}
            className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            {t("common.cancel")}
          </button>
          <button
            onClick={handleConfirm}
            disabled={isPending}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-gray-400"
          >
            {isPending
              ? t("common.processing")
              : t("modals.confirmation.confirm")}
          </button>
        </div>
      </div>
    </div>
  );
};
