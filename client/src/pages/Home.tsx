import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ShieldIcon,
  LightningIcon,
  MobileIcon,
  PeopleIcon,
} from "../components/Icons";

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

    // Simulate async signup
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 700);
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800 dark:bg-[var(--color-custom-dark)] dark:text-gray-200">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 text-white dark:bg-[var(--color-custom-dark)] dark:text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-sm font-semibold mb-4">
                {t("home.hero.pretitle")}
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                {t("home.hero.title")}
              </h1>
              <p className="mt-6 text-lg max-w-xl text-white/90">
                {t("home.hero.subtitle")}
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="#accounts"
                  className="inline-flex items-center justify-center rounded-md bg-white dark:bg-[var(--color-custom-dark)] text-indigo-600 dark:text-green-400 px-5 py-3 font-medium shadow-sm hover:opacity-95 hover-themed"
                >
                  {t("home.hero.ctaStart")}
                </a>
                <a
                  href="#learn"
                  className="inline-flex items-center justify-center rounded-md bg-white/20 dark:bg-[var(--color-custom-dark)] text-white px-5 py-3 font-medium hover:bg-white/25 hover-themed"
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
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  className="rounded-md bg-indigo-700 hover:bg-indigo-800 dark:bg-green-600 dark:hover:bg-green-700 px-4 py-2 font-semibold hover-themed disabled:opacity-60"
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

              <div className="mt-8 flex gap-6">
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">
                    {t("home.stats.customers.value")}
                  </span>
                  <span className="text-sm text-white/90 dark:text-gray-200">
                    {t("home.stats.customers.label")}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">
                    {t("home.stats.aum.value")}
                  </span>
                  <span className="text-sm text-white/90 dark:text-gray-200">
                    {t("home.stats.aum.label")}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">
                    {t("home.stats.countries.value")}
                  </span>
                  <span className="text-sm text-white/90 dark:text-gray-200">
                    {t("home.stats.countries.label")}
                  </span>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Mock phone / card */}
              <div className="mx-auto max-w-sm transform rounded-3xl bg-white/10 dark:bg-[var(--color-custom-dark)] p-6 shadow-2xl backdrop-blur-md ring-1 ring-white/10 dark:text-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-semibold">
                      {t("brand.name")} — {t("home.card.type")}
                    </h3>
                    <p className="mt-1 text-xs text-white/80">
                      {t("home.card.available")}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">$6,421.82</div>
                    <div className="text-xs text-white/80">
                      {t("home.card.updated")}
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button className="rounded-md bg-white/20 dark:bg-[var(--color-custom-dark)] px-3 py-2 text-sm hover-themed dark:text-gray-200">
                    {t("home.card.send")}
                  </button>
                  <button className="rounded-md bg-white/20 dark:bg-[var(--color-custom-dark)] px-3 py-2 text-sm hover-themed dark:text-gray-200">
                    {t("home.card.deposit")}
                  </button>
                </div>

                <div className="mt-6 rounded-lg bg-gradient-to-r from-white/5 to-white/2 dark:bg-[var(--color-custom-dark)] p-3 dark:text-gray-200">
                  <div className="text-xs text-white/80">
                    {t("home.card.recent")}
                  </div>
                  <ul className="mt-2 text-sm space-y-2">
                    <li className="flex justify-between">
                      <span>{t("home.card.recent1")}</span>
                      <span className="font-medium">
                        {t("home.card.recent1Amount")}
                      </span>
                    </li>
                    <li className="flex justify-between text-sm text-white/80">
                      <span>{t("home.card.recent2")}</span>
                      <span>{t("home.card.recent2Amount")}</span>
                    </li>
                    <li className="flex justify-between text-sm text-white/80">
                      <span>{t("home.card.recent3")}</span>
                      <span>{t("home.card.recent3Amount")}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Decorative shapes */}
              <svg
                className="absolute -right-10 -bottom-10 w-72 opacity-40"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="g" x1="0" x2="1">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="50" r="80" fill="url(#g)" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold">{t("home.features.title")}</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            {t("home.features.subtitle")}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="rounded-xl border border-gray-200 bg-white dark:bg-[var(--color-custom-dark)] dark:border-white/10 dark:text-gray-200 p-5 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gray-50 dark:bg-[var(--color-custom-dark)]">
              <ShieldIcon className="text-indigo-500 dark:text-green-400" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">
              {t("home.features.secure.title")}
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {t("home.features.secure.desc")}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white dark:bg-[var(--color-custom-dark)] dark:border-white/10 dark:text-gray-200 p-5 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gray-50 dark:bg-[var(--color-custom-dark)]">
              <LightningIcon className="text-yellow-500 dark:text-green-400" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">
              {t("home.features.fast.title")}
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {t("home.features.fast.desc")}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white dark:bg-[var(--color-custom-dark)] dark:border-white/10 dark:text-gray-200 p-5 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gray-50 dark:bg-[var(--color-custom-dark)]">
              <MobileIcon className="text-cyan-500 dark:text-green-400" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">
              {t("home.features.mobile.title")}
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {t("home.features.mobile.desc")}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white dark:bg-[var(--color-custom-dark)] dark:border-white/10 dark:text-gray-200 p-5 shadow-sm">
            <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gray-50 dark:bg-[var(--color-custom-dark)]">
              <PeopleIcon className="text-green-500 dark:text-green-400" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">
              {t("home.features.support.title")}
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {t("home.features.support.desc")}
            </p>
          </div>
        </div>
      </section>

      {/* Accounts / Products */}
      <section
        id="accounts"
        className="bg-gray-50 dark:bg-[var(--color-custom-dark)] dark:text-gray-200 py-16"
      >
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-center">
            {t("home.accounts.title")}
          </h2>
          <p className="mt-3 text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t("home.accounts.subtitle")}
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-gray-200 bg-white dark:bg-[var(--color-custom-dark)] dark:border-white/10 dark:text-gray-200 p-6 shadow-sm">
              <h3 className="text-xl font-semibold">
                {t("home.accounts.checking.title")}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {t("home.accounts.checking.desc")}
              </p>
              <div className="mt-6 text-2xl font-bold">
                {t("home.accounts.checking.price")}
              </div>
              <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>{t("home.accounts.checking.feature1")}</li>
                <li>{t("home.accounts.checking.feature2")}</li>
                <li>{t("home.accounts.checking.feature3")}</li>
              </ul>
              <button className="mt-6 w-full rounded-md bg-indigo-600 hover:bg-indigo-700 dark:bg-green-600 dark:hover:bg-green-700 px-4 py-2 text-white hover-themed">
                {t("home.accounts.checking.cta")}
              </button>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white dark:bg-[var(--color-custom-dark)] dark:border-white/10 dark:text-gray-200 p-6 shadow-sm">
              <h3 className="text-xl font-semibold">
                {t("home.accounts.savings.title")}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {t("home.accounts.savings.desc")}
              </p>
              <div className="mt-6 text-2xl font-bold">
                {t("home.accounts.savings.price")}
              </div>
              <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>{t("home.accounts.savings.feature1")}</li>
                <li>{t("home.accounts.savings.feature2")}</li>
                <li>{t("home.accounts.savings.feature3")}</li>
              </ul>
              <button className="mt-6 w-full rounded-md border border-indigo-600 dark:border-green-400 dark:bg-[var(--color-custom-dark)] px-4 py-2 hover-themed">
                {t("home.accounts.savings.cta")}
              </button>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white dark:bg-[var(--color-custom-dark)] dark:border-white/10 dark:text-gray-200 p-6 shadow-sm">
              <h3 className="text-xl font-semibold">
                {t("home.accounts.premium.title")}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {t("home.accounts.premium.desc")}
              </p>
              <div className="mt-6 text-2xl font-bold">
                {t("home.accounts.premium.price")}
              </div>
              <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li>{t("home.accounts.premium.feature1")}</li>
                <li>{t("home.accounts.premium.feature2")}</li>
                <li>{t("home.accounts.premium.feature3")}</li>
              </ul>
              <button className="mt-6 w-full rounded-md bg-indigo-600 hover:bg-indigo-700 dark:bg-green-600 dark:hover:bg-green-700 px-4 py-2 text-white hover-themed">
                {t("home.accounts.premium.cta")}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile app + security */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold">{t("home.mobile.title")}</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              {t("home.mobile.subtitle")}
            </p>

            <ul className="mt-6 space-y-3 text-gray-700 dark:text-gray-300">
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex items-center justify-center rounded bg-gray-50 dark:bg-[var(--color-custom-dark)] p-2">
                  {<MobileIcon className="text-cyan-500 dark:text-green-400" />}
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
                <span className="mt-1 inline-flex items-center justify-center rounded bg-gray-50 dark:bg-[var(--color-custom-dark)] p-2">
                  {
                    <LightningIcon className="text-yellow-500 dark:text-green-400" />
                  }
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
                <span className="mt-1 inline-flex items-center justify-center rounded bg-gray-50 dark:bg-[var(--color-custom-dark)] p-2">
                  {
                    <ShieldIcon className="text-indigo-500 dark:text-green-400" />
                  }
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
            <div className="w-72 rounded-3xl border bg-white dark:bg-[var(--color-custom-dark)] dark:text-gray-200 p-4 shadow-lg">
              <div className="h-56 rounded-lg bg-gradient-to-b from-indigo-50 to-white dark:bg-[var(--color-custom-dark)] p-4">
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
                  <button className="flex-1 rounded-md bg-indigo-600 hover:bg-indigo-700 dark:bg-green-600 dark:hover:bg-green-700 px-3 py-2 text-white hover-themed">
                    {t("home.mobile.send")}
                  </button>
                  <button className="flex-1 rounded-md border px-3 py-2 hover-themed dark:bg-[var(--color-custom-dark)] dark:text-gray-200">
                    {t("home.mobile.receive")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials and FAQ */}
      <section className="bg-white dark:bg-[var(--color-custom-dark)] dark:text-gray-200 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-bold text-center">
            {t("home.testimonials.title")}
          </h2>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <blockquote className="rounded-xl border p-6">
              <p className="text-gray-700 dark:text-gray-300">
                {t("home.testimonials.1")}
              </p>
              <cite className="mt-4 block font-semibold text-sm">
                — A. Ramirez
              </cite>
            </blockquote>

            <blockquote className="rounded-xl border p-6">
              <p className="text-gray-700 dark:text-gray-300">
                {t("home.testimonials.2")}
              </p>
              <cite className="mt-4 block font-semibold text-sm">
                — J. Patel
              </cite>
            </blockquote>

            <blockquote className="rounded-xl border p-6">
              <p className="text-gray-700 dark:text-gray-300">
                {t("home.testimonials.3")}
              </p>
              <cite className="mt-4 block font-semibold text-sm">— S. Lee</cite>
            </blockquote>
          </div>

          <div className="mt-12 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold">{t("home.faq.title")}</h3>
            <div className="mt-4 space-y-3">
              <details className="rounded-lg border">
                <summary className="cursor-pointer px-4 py-3 text-sm font-medium">
                  {t("home.faq.q1")}
                </summary>
                <div className="border-t px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                  {t("home.faq.a1")}
                </div>
              </details>

              <details className="rounded-lg border">
                <summary className="cursor-pointer px-4 py-3 text-sm font-medium">
                  {t("home.faq.q2")}
                </summary>
                <div className="border-t px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                  {t("home.faq.a2")}
                </div>
              </details>

              <details className="rounded-lg border">
                <summary className="cursor-pointer px-4 py-3 text-sm font-medium">
                  {t("home.faq.q3")}
                </summary>
                <div className="border-t px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                  {t("home.faq.a3")}
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
