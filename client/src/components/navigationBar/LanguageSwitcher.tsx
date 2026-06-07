import { useTranslation } from "react-i18next";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const nextLang = i18n.language === "en" ? "bg" : "en";
    i18n.changeLanguage(nextLang);
  };

  return (
    <div className="hover-themed transition-colors flex justify-center items-center">
      <button onClick={() => toggleLanguage()}>
        {i18n.language === "en" ? "Български" : "English"}
      </button>
    </div>
  );
};

export default LanguageSwitcher;
