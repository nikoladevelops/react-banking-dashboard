import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="min-h-[calc(100vh-200px)] flex justify-center items-center w-full">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-100">
          {t("notfound.code")}
        </h1>
        <p className="text-2xl text-gray-600 dark:text-gray-400 mt-4">
          {t("notfound.message")}
        </p>
        <a
          href="/"
          className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {t("notfound.goHome")}
        </a>
      </div>
    </div>
  );
}
