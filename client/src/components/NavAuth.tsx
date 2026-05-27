import { NavLink } from "react-router";
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
          <NavLink
            to="/register"
            className="nav-link hover-themed transition-colors"
            onClick={closeMainNav}
          >
            {t("nav.register")}
          </NavLink>
          <NavLink
            to="/login"
            className="nav-link hover-themed transition-colors"
            onClick={closeMainNav}
          >
            {t("nav.login")}
          </NavLink>
        </>
      ) : (
        <>
          <NavLink
            to="/profile"
            className="nav-link flex items-center hover-themed transition-colors"
            onClick={closeMainNav}
          >
            {t("nav.profile")}
          </NavLink>
          <LogoutButton />
        </>
      )}
    </div>
  );
}
