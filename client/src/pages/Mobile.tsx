import { useTranslation } from "react-i18next";
import { MobileIcon, LightningIcon, ShieldIcon } from "../components/Icons";

const Mobile = () => {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-custom-dark text-gray-800 dark:text-gray-200 px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <header className="text-center">
          <h1 className="text-4xl font-extrabold">{t("mobile.hero.title")}</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            {t("mobile.hero.subtitle")}
          </p>
        </header>

        <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-xl border p-6 bg-white dark:bg-custom-dark">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded bg-gray-50 dark:bg-custom-dark">
                <MobileIcon className="text-cyan-500 dark:text-green-400" />
              </span>
              <div>
                <div className="font-semibold">{t("mobile.features.f1")}</div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border p-6 bg-white dark:bg-custom-dark">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded bg-gray-50 dark:bg-custom-dark">
                <LightningIcon className="text-yellow-500 dark:text-green-400" />
              </span>
              <div>
                <div className="font-semibold">{t("mobile.features.f2")}</div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border p-6 bg-white dark:bg-custom-dark">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded bg-gray-50 dark:bg-custom-dark">
                <ShieldIcon className="text-indigo-500 dark:text-green-400" />
              </span>
              <div>
                <div className="font-semibold">{t("mobile.features.f3")}</div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12 text-center">
          <button className="rounded-md bg-indigo-600 hover:bg-indigo-700 dark:bg-green-600 dark:hover:bg-green-700 px-5 py-3 text-white hover-themed">
            {t("mobile.cta.download")}
          </button>
        </section>
      </div>
    </main>
  );
};

export default Mobile;
