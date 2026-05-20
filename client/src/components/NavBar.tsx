import { Link, useNavigate } from "react-router";
import FibankLogo from "../assets/navbar/fibank-logo-white.svg?react";
import Desktop from "../assets/navbar/desktop.svg?react";
import Android from "../assets/navbar/android.svg?react";
import Apple from "../assets/navbar/apple.svg?react";
import Info from "../assets/navbar/info.svg?react";
import MenuBurger from "../assets/navbar/menu-burger.svg?react";
import Clipboard from "../assets/navbar/clipboard.svg?react";
import LanguageSwitcher from "./LanguageSwitcher.js";
import { useTranslation } from "react-i18next";
import DarkModeToggle from "./DarkModeToggle.js";
import NavButton from "./NavButton.js";
import LogoutButton from "./LogoutButton.js";

export default function NavBar({ user, setUser }) {
  const { t } = useTranslation();

  return (
    <div>
      <nav className="flex flex-wrap justify-evenly items-center bg-white dark:bg-black border-b border-gray-200 min-h-35">
        <div className="flex items-center justify-center">
          <Link to="/" className="inline-flex items-center justify-center">
            <FibankLogo className="w-45 h-10 hover-themed" />
          </Link>
        </div>

        <div className="flex justify-center gap-5 mr-5 ml-5">
          <NavButton to="/" SvgIcon={Desktop} children={t("nav.home")} />
          <NavButton
            to="/mobile"
            SvgIcon={Apple}
            SvgIcon2={Android}
            children={t("nav.mobileApp")}
          />
          <NavButton
            to="/changes"
            SvgIcon={Clipboard}
            children={t("nav.changesTariff")}
          />
          <NavButton to="/help" SvgIcon={Info} children={t("nav.help")} />
        </div>

        {!user ? (
          <div className="flex gap-5 justify-center items-center">
            <Link to="/register" className="hover-themed transition-colors">
              {t("nav.register")}
            </Link>
            <Link to="/login" className="hover-themed transition-colors">
              {t("nav.login")}
            </Link>
            <DarkModeToggle />
            <div className="hover-themed transition-colors">
              <LanguageSwitcher />
            </div>
          </div>
        ) : (
          <div className="flex gap-5 justify-center items-center">
            <Link
              to="/profile"
              className="flex items-center hover-themed transition-colors"
            >
              {t("nav.profile")}
            </Link>
            <LogoutButton setUser={setUser} />
            <DarkModeToggle />
            <div className="hover-themed transition-colors">
              <LanguageSwitcher />
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
