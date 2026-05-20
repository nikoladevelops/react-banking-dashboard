import { Link } from "react-router";
import LogoutButton from "./LogoutButton";
import { useTranslation } from "react-i18next";

export default function NavAuth({ user, setUser, className }) {
  const { t } = useTranslation();
  return (
    <div className={className}>
      {!user ? (
        <>
          <Link to="/register" className="hover-themed transition-colors">
            {t("nav.register")}
          </Link>
          <Link to="/login" className="hover-themed transition-colors">
            {t("nav.login")}
          </Link>
        </>
      ) : (
        <>
          <Link
            to="/profile"
            className="flex items-center hover-themed transition-colors"
          >
            {t("nav.profile")}
          </Link>
          <LogoutButton setUser={setUser} />
        </>
      )}
    </div>
  );
}
