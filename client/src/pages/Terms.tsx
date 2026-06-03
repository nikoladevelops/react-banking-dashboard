import { useTranslation } from "react-i18next";

const Terms = () => {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[var(--color-custom-dark)] text-gray-800 dark:text-gray-200 px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-extrabold">{t("terms.title")}</h1>
        <p className="mt-4 text-gray-600 dark:text-gray-300">
          {t("terms.intro")}
        </p>

        <section className="mt-8">
          <h2 className="text-xl font-semibold">{t("terms.section1.title")}</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {t("terms.section1.content")}
          </p>
        </section>

        <section className="mt-6">
          <h2 className="text-xl font-semibold">{t("terms.section2.title")}</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            {t("terms.section2.content")}
          </p>
        </section>
      </div>
    </main>
  );
};

export default Terms;
