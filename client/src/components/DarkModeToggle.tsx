import { useState } from "react";
import { useTranslation } from "react-i18next";
import { initDarkMode, setDarkModePreference } from "../utility/darkMode";

export default function DarkModeToggle() {
  const { t } = useTranslation();
  const [darkMode, setDarkMode] = useState(() => initDarkMode());

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    setDarkModePreference(newMode);
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
