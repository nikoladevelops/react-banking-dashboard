import NavButton from "./NavButton";
import Desktop from "../assets/navbar/desktop.svg?react";
import Apple from "../assets/navbar/apple.svg?react";
import Android from "../assets/navbar/android.svg?react";
import Clipboard from "../assets/navbar/clipboard.svg?react";
import Info from "../assets/navbar/info.svg?react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import DarkModeToggle from "./DarkModeToggle";

export default function NavLinks({ className }) {
  const { t } = useTranslation();
  return (
    <div className={className}>
      <LanguageSwitcher />
      <NavButton to="/" SvgIcon={Desktop}>
        {t("nav.home")}
      </NavButton>
      <NavButton to="/mobile" SvgIcon={Apple} SvgIcon2={Android}>
        {t("nav.mobileApp")}
      </NavButton>
      <NavButton to="/changes" SvgIcon={Clipboard}>
        {t("nav.changesTariff")}
      </NavButton>
      <NavButton to="/help" SvgIcon={Info}>
        {t("nav.help")}
      </NavButton>
      <DarkModeToggle />
    </div>
  );
}
