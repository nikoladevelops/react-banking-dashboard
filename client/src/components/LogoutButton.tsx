import Logout from "../assets/navbar/shutdown.svg?react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import api from "../api/axiosInstance.js";

export default function LogoutButton({ setUser }) {
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
    <button
      onClick={logOut}
      className="flex items-center gap-2 hover-themed transition-colors text-center max-sm:flex-col"
    >
      <Logout className="w-5 h-4" />
      {t("nav.logout")}
    </button>
  );
}
