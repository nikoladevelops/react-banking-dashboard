import { Link, useNavigate } from "react-router";
import FibankLogo from "../assets/navbar/fibank-logo-white.svg?react";
import desktop from "../assets/navbar/desktop.svg?react";
import android from "../assets/navbar/android.svg?react";
import apple from "../assets/navbar/apple.svg";
import info from "../assets/navbar/info.svg";
import menuBurger from "../assets/navbar/menu-burger.svg";
import clipboard from "../assets/navbar/clipboard.svg";
import api from "../api/axiosInstance.js";
import LanguageSwitcher from "./LanguageSwitcher.js";
import { useTranslation } from "react-i18next";
import DarkModeToggle from "./DarkModeToggle.js";

export default function NavBar({ user, setUser }) {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const logOut = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error("Failed to log out. " + err.message);
    }
  };

  return (
    <div>
      <nav className="flex flex-wrap justify-evenly items-center bg-white dark:bg-black border-b border-gray-200 min-h-35">
        <div className="flex items-center justify-center">
          <Link to="/" className="inline-flex items-center justify-center">
            <FibankLogo className="w-45 h-10 text-black dark:text-white" />
          </Link>
        </div>

        <div className="flex justify-center gap-5 mr-5 ml-5">
          <div className="hover-themed transition-colors">
            <LanguageSwitcher />
          </div>
          <Link to="/" className="hover-themed transition-colors">
            {t("nav.home")}
          </Link>
          <Link to="/mobile" className=" hover-themed transition-colors">
            {t("nav.mobileApp")}
          </Link>
          <Link to="/changes" className=" hover-themed transition-colors">
            {t("nav.changesTariff")}
          </Link>
          <Link to="/help" className=" hover-themed transition-colors">
            {t("nav.help")}
          </Link>

          {user && (
            <Link
              to="/profile"
              className="flex items-center hover-themed transition-colors"
            >
              {t("nav.profile")}
            </Link>
          )}
        </div>

        {!user ? (
          <div className="flex gap-5 justify-center items-center">
            <Link to="/register" className=" hover-themed transition-colors">
              {t("nav.register")}
            </Link>
            <Link to="/login" className="hover-themed transition-colors">
              {t("nav.login")}
            </Link>
            <DarkModeToggle />
          </div>
        ) : (
          <div className="flex gap-5 justify-center items-center">
            <button onClick={logOut} className="hover-themed transition-colors">
              {t("nav.logout")}
            </button>
            <DarkModeToggle />
          </div>
        )}
      </nav>
    </div>
  );
}
