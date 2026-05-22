import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function DarkModeToggle() {
  const { t } = useTranslation();

  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    const isDark = saved === "true" || (saved === null && prefersDark);

    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    return isDark;
  });

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", String(newMode));

    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="hover-themed transition-colors"
      aria-label="Toggle dark mode"
    >
      {darkMode ? (
        <div className="flex text-center max-sm:flex-col gap-2">
          <span>🌞</span>
          <span>{t("generic.lightMode")}</span>
        </div>
      ) : (
        <div className="flex text-center max-sm:flex-col gap-2">
          <span>🌙</span>
          <span>{t("generic.darkMode")}</span>
        </div>
      )}
    </button>
  );
}
