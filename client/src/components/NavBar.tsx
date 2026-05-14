// NavBar.tsx
import { Link, useNavigate } from "react-router";
import fibankLogo from "../assets/fibank-logo.png";
import api from "../api/axiosInstance.js";

export default function NavBar({ user, setUser }) {
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
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {" "}
        <div className="grid grid-cols-[1fr_auto_1fr] items-center text-sm font-medium text-gray-700 py-3">
          <div className="justify-self-start">
            <Link to="/">
              <img src={fibankLogo} alt="FiBank Logo" className="w-35" />
            </Link>
          </div>

          <div className="flex justify-center gap-8">
            <Link
              to="/"
              className="flex items-center hover:text-blue-600 transition-colors"
            >
              Български
            </Link>
            <Link
              to="/about"
              className="flex items-center hover:text-blue-600 transition-colors"
            >
              Към сайта
            </Link>
            <Link
              to="/mobile"
              className="flex items-center hover:text-blue-600 transition-colors"
            >
              Мобилно приложение
            </Link>
            <Link
              to="/changes"
              className="flex items-center hover:text-blue-600 transition-colors"
            >
              Промени в ОУ и тарифа
            </Link>
            <Link
              to="/help"
              className="flex items-center hover:text-blue-600 transition-colors"
            >
              Помощ
            </Link>

            {user && (
              <Link
                to="/profile"
                className="flex items-center hover:text-blue-600 transition-colors"
              >
                Профил
              </Link>
            )}
          </div>

          {!user ? (
            <div className="justify-self-end">
              <div className="flex gap-10">
                <Link
                  to="/register"
                  className="text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors whitespace-nowrap"
                >
                  РЕГИСТРАЦИЯ
                </Link>
                <Link
                  to="/login"
                  className="text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors whitespace-nowrap"
                >
                  ВХОД
                </Link>
              </div>
            </div>
          ) : (
            <button
              onClick={logOut}
              className="text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors whitespace-nowrap"
            >
              ИЗХОД
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
