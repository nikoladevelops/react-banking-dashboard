import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-[var(--color-custom-dark)] text-gray-800 dark:text-gray-200 px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <header className="text-center">
          <h1 className="text-4xl font-extrabold">{t("about.hero.title")}</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            {t("about.hero.subtitle")}
          </p>
        </header>

        <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold">{t("about.mission.title")}</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300">
              {t("about.mission.content")}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold">{t("about.values.title")}</h2>
            <ul className="mt-3 space-y-2 text-gray-600 dark:text-gray-300">
              <li>• {t("about.values.v1")}</li>
              <li>• {t("about.values.v2")}</li>
              <li>• {t("about.values.v3")}</li>
            </ul>
          </div>
        </section>

        <section className="mt-12">
          <h3 className="text-2xl font-semibold">{t("about.team.title")}</h3>
          <p className="mt-3 text-gray-600 dark:text-gray-300">
            {t("about.team.content")}
          </p>
        </section>

        <section className="mt-12 text-center">
          <h4 className="text-xl font-semibold">{t("about.cta.title")}</h4>
          <button className="mt-4 rounded-md bg-indigo-600 hover:bg-indigo-700 dark:bg-green-600 dark:hover:bg-green-700 px-4 py-2 text-white hover-themed">
            {t("about.cta.button")}
          </button>
        </section>
      </div>
    </main>
  );
};

export default About;
