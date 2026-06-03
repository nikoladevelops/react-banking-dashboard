import { useTranslation } from "react-i18next";

const Help = () => {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-custom-dark text-gray-800 dark:text-gray-200 px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <header className="text-center">
          <h1 className="text-4xl font-extrabold">{t("help.hero.title")}</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            {t("help.hero.subtitle")}
          </p>
        </header>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">{t("help.support.title")}</h2>
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            {t("help.support.content")}
          </p>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            {t("help.support.hours")}
          </p>
          <div className="mt-4">
            <a
              href="mailto:support@fibank.example"
              className="text-indigo-600 hover:underline dark:text-green-400"
            >
              support@fibank.example
            </a>
          </div>
        </section>

        <section className="mt-10">
          <h3 className="text-xl font-semibold">{t("help.faq.title")}</h3>

          <div className="mt-4 space-y-3">
            <details className="rounded-lg border">
              <summary className="cursor-pointer px-4 py-3 text-sm font-medium">
                {t("help.faq.q1")}
              </summary>
              <div className="border-t px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                {t("help.faq.a1")}
              </div>
            </details>

            <details className="rounded-lg border">
              <summary className="cursor-pointer px-4 py-3 text-sm font-medium">
                {t("help.faq.q2")}
              </summary>
              <div className="border-t px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                {t("help.faq.a2")}
              </div>
            </details>

            <details className="rounded-lg border">
              <summary className="cursor-pointer px-4 py-3 text-sm font-medium">
                {t("help.faq.q3")}
              </summary>
              <div className="border-t px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                {t("help.faq.a3")}
              </div>
            </details>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Help;
