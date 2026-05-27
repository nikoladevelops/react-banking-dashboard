import { Link } from "react-router";
import LogoutButton from "./LogoutButton";
import { useTranslation } from "react-i18next";
import { useUserStore } from "../userStore";
import { useUIStore } from "../uiStore";

export default function NavAuth({ className }) {
  const { t } = useTranslation();

  const user = useUserStore((state) => state.user);
  const closeMainNav = useUIStore((state) => state.closeMainNav);

  return (
    <div className={className}>
      {!user ? (
        <>
          <Link
            to="/register"
            className="hover-themed transition-colors"
            onClick={closeMainNav}
          >
            {t("nav.register")}
          </Link>
          <Link
            to="/login"
            className="hover-themed transition-colors"
            onClick={closeMainNav}
          >
            {t("nav.login")}
          </Link>
        </>
      ) : (
        <>
          <Link
            to="/profile"
            className="flex items-center hover-themed transition-colors"
            onClick={closeMainNav}
          >
            {t("nav.profile")}
          </Link>
          <LogoutButton />
        </>
      )}
    </div>
  );
}
