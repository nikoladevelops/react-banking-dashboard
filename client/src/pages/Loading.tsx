import { useTranslation } from "react-i18next";

export default function Loading() {
  const { t } = useTranslation();

  return (
    <div className="min-h-[calc(100vh-200px)] flex justify-center items-center w-full">
      <div className="text-center">
        <p className="text-2xl text-gray-600 dark:text-gray-400 mt-4">
          {t("loading.loading")}
        </p>
        <p className="mt-6 inline-block px-6 py-3 text-gray-500 dark:text-white rounded-lg">
          {t("loading.message")}
        </p>
      </div>
    </div>
  );
}
