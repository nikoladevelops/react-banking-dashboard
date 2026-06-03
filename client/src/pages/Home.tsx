import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ShieldIcon,
  LightningIcon,
  MobileIcon,
  PeopleIcon,
} from "../components/Icons";
import FeatureCard from "../components/FeatureCard";
import ProductCard from "../components/ProductCard";
import Stat from "../components/Stat";
import Testimonial from "../components/Testimonial";
import FAQItem from "../components/FAQItem";
import CardMock from "../components/CardMock";

export default function Home() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setStatus("error");
      return;
    }

    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 700);
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 dark:bg-custom-dark dark:text-gray-200">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 text-white dark:bg-custom-dark dark:text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-sm font-semibold mb-4">
                {t("home.hero.pretitle")}
              </span>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
                {t("home.hero.title")}
              </h1>

              <p className="mt-6 text-lg max-w-xl text-white/90">
                {t("home.hero.subtitle")}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="#accounts"
                  className="inline-flex items-center justify-center rounded-md bg-white dark:bg-custom-dark text-indigo-600 dark:text-green-400 px-5 py-3 font-medium shadow-sm hover:opacity-95 hover-themed transition transform hover:-translate-y-0.5 hover:scale-105"
                >
                  {t("home.hero.ctaStart")}
                </a>

                <a
                  href="#learn"
                  className="inline-flex items-center justify-center rounded-md bg-white/20 dark:bg-custom-dark text-white px-5 py-3 font-medium hover:bg-white/25 hover-themed transition transform hover:-translate-y-0.5 hover:scale-105"
                >
                  {t("home.hero.ctaLearn")}
                </a>
              </div>

              <form
                onSubmit={handleSignup}
                className="mt-8 flex max-w-md gap-2"
              >
                <label htmlFor="email" className="sr-only">
                  {t("home.signup.label")}
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("home.signup.placeholder")}
                  className="w-full rounded-md border-0 px-4 py-3 text-gray-800 focus:outline-none dark:text-gray-200"
                />
                <button
                  type="submit"
                  className="rounded-md bg-indigo-700 hover:bg-indigo-800 dark:bg-green-600 dark:hover:bg-green-700 px-4 py-2 font-semibold hover-themed transition transform hover:-translate-y-0.5 hover:scale-105 disabled:opacity-60"
                  disabled={status === "loading"}
                >
                  {status === "loading"
                    ? t("home.signup.signing")
                    : t("home.signup.notify")}
                </button>
              </form>

              <div className="mt-3 text-sm">
                {status === "success" && (
                  <span className="text-green-200">
                    {t("home.signup.success")}
                  </span>
                )}
                {status === "error" && (
                  <span className="text-yellow-200">
                    {t("home.signup.error")}
                  </span>
                )}
              </div>

              <div className="mt-8 flex gap-8">
                <Stat
                  label={t("home.stats.customers.label")}
                  value={t("home.stats.customers.value")}
                />
                <Stat
                  label={t("home.stats.aum.label")}
                  value={t("home.stats.aum.value")}
                />
                <Stat
                  label={t("home.stats.countries.label")}
                  value={t("home.stats.countries.value")}
                />
              </div>
            </div>

            <div className="relative flex justify-center">
              <CardMock
                title={`${t("brand.name")} - ${t("home.card.type")}`}
                balance="$6,421.82"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold">
            {t("home.features.title")}
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            {t("home.features.subtitle")}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={
              <ShieldIcon className="text-indigo-500 dark:text-green-400" />
            }
            title={t("home.features.secure.title")}
            desc={t("home.features.secure.desc")}
          />

          <FeatureCard
            icon={
              <LightningIcon className="text-yellow-500 dark:text-green-400" />
            }
            title={t("home.features.fast.title")}
            desc={t("home.features.fast.desc")}
          />

          <FeatureCard
            icon={<MobileIcon className="text-cyan-500 dark:text-green-400" />}
            title={t("home.features.mobile.title")}
            desc={t("home.features.mobile.desc")}
          />

          <FeatureCard
            icon={<PeopleIcon className="text-green-500 dark:text-green-400" />}
            title={t("home.features.support.title")}
            desc={t("home.features.support.desc")}
          />
        </div>
      </section>

      {/* Accounts / Products */}
      <section
        id="accounts"
        className="bg-gray-50 dark:bg-custom-dark dark:text-gray-200 py-12 md:py-16 lg:py-20"
      >
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center">
            {t("home.accounts.title")}
          </h2>
          <p className="mt-3 text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t("home.accounts.subtitle")}
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <ProductCard
              title={t("home.accounts.checking.title")}
              desc={t("home.accounts.checking.desc")}
              price={t("home.accounts.checking.price")}
              features={[
                t("home.accounts.checking.feature1"),
                t("home.accounts.checking.feature2"),
                t("home.accounts.checking.feature3"),
              ]}
              cta={t("home.accounts.checking.cta")}
              primary
            />

            <ProductCard
              title={t("home.accounts.savings.title")}
              desc={t("home.accounts.savings.desc")}
              price={t("home.accounts.savings.price")}
              features={[
                t("home.accounts.savings.feature1"),
                t("home.accounts.savings.feature2"),
                t("home.accounts.savings.feature3"),
              ]}
              cta={t("home.accounts.savings.cta")}
            />

            <ProductCard
              title={t("home.accounts.premium.title")}
              desc={t("home.accounts.premium.desc")}
              price={t("home.accounts.premium.price")}
              features={[
                t("home.accounts.premium.feature1"),
                t("home.accounts.premium.feature2"),
                t("home.accounts.premium.feature3"),
              ]}
              cta={t("home.accounts.premium.cta")}
              primary
            />
          </div>
        </div>
      </section>

      {/* Mobile app + security */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              {t("home.mobile.title")}
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              {t("home.mobile.subtitle")}
            </p>

            <ul className="mt-6 space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex items-center justify-center rounded bg-gray-50 dark:bg-custom-dark p-2">
                  <MobileIcon className="text-cyan-500 dark:text-green-400" />
                </span>
                <div>
                  <div className="font-semibold">
                    {t("home.mobile.feature1.title")}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {t("home.mobile.feature1.desc")}
                  </div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex items-center justify-center rounded bg-gray-50 dark:bg-custom-dark p-2">
                  <LightningIcon className="text-yellow-500 dark:text-green-400" />
                </span>
                <div>
                  <div className="font-semibold">
                    {t("home.mobile.feature2.title")}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {t("home.mobile.feature2.desc")}
                  </div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex items-center justify-center rounded bg-gray-50 dark:bg-custom-dark p-2">
                  <ShieldIcon className="text-indigo-500 dark:text-green-400" />
                </span>
                <div>
                  <div className="font-semibold">
                    {t("home.mobile.feature3.title")}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {t("home.mobile.feature3.desc")}
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <div className="w-full rounded-3xl border bg-white dark:bg-custom-dark dark:text-gray-200 p-4 shadow-lg">
                <div className="h-56 rounded-lg bg-gradient-to-b from-indigo-50 to-white dark:bg-custom-dark p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">{t("brand.name")}</div>
                    <div className="text-xs text-gray-500">
                      {t("home.mobile.accountType")}
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="text-2xl font-bold">$12,348.23</div>
                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                      <span className="inline-block h-2 w-2 rounded-full bg-green-400" />{" "}
                      {t("home.mobile.available")}
                    </div>
                  </div>

                  <div className="mt-6 flex gap-3">
                    <button className="flex-1 rounded-md bg-indigo-600 hover:bg-indigo-700 dark:bg-green-600 dark:hover:bg-green-700 px-3 py-2 text-white hover-themed transition transform hover:-translate-y-0.5 hover:scale-105">
                      {t("home.mobile.send")}
                    </button>
                    <button className="flex-1 rounded-md border px-3 py-2 hover-themed dark:bg-custom-dark dark:text-gray-200">
                      {t("home.mobile.receive")}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials and FAQ */}
      <section className="bg-white dark:bg-custom-dark dark:text-gray-200 py-12 md:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center">
            {t("home.testimonials.title")}
          </h2>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Testimonial quote={t("home.testimonials.1")} author="A. Ramirez" />
            <Testimonial quote={t("home.testimonials.2")} author="J. Patel" />
            <Testimonial quote={t("home.testimonials.3")} author="S. Lee" />
          </div>

          <div className="mt-12 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold">{t("home.faq.title")}</h3>
            <div className="mt-4 space-y-3">
              <FAQItem q={t("home.faq.q1")} a={t("home.faq.a1")} />
              <FAQItem q={t("home.faq.q2")} a={t("home.faq.a2")} />
              <FAQItem q={t("home.faq.q3")} a={t("home.faq.a3")} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
