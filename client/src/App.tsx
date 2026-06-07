import { BrowserRouter, Routes, Route } from "react-router";
import { useTranslation } from "react-i18next";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { useEffect } from "react";
import Profile from "./pages/Profile";
import NavBar from "./components/navigationBar/NavBar.js";
import { useUserStore } from "./userStore.js";
import ProtectedRoute from "./components/routeProtections/ProtectedRoute.js";
import GuestOnlyRoute from "./components/routeProtections/GuestOnlyRoute.js";
import NotFound from "./pages/NotFound.js";
import Loading from "./pages/Loading.js";
import About from "./pages/About.js";
import Mobile from "./pages/Mobile.js";
import Terms from "./pages/Terms.js";
import Help from "./pages/Help.js";
import Settings from "./pages/Settings.js";
import UserInfo from "./pages/UserInfo.js";
import AdminOnlyRoute from "./components/routeProtections/AdminOnlyRoute.js";

function App() {
  const user = useUserStore((state) => state.user);
  const fetchUser = useUserStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const { t } = useTranslation();

  if (user === undefined) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-custom-dark text-gray-900 dark:text-gray-100">
        <NavBar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/mobile" element={<Mobile />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/help" element={<Help />} />
            <Route
              path="/login"
              element={
                <GuestOnlyRoute>
                  <Login />
                </GuestOnlyRoute>
              }
            />
            <Route
              path="/register"
              element={
                <GuestOnlyRoute>
                  <Register />
                </GuestOnlyRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users/:username"
              element={
                <AdminOnlyRoute>
                  <UserInfo />
                </AdminOnlyRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Footer (shared) */}
        <footer className="bg-gray-900 text-gray-300 dark:bg-custom-dark dark:text-gray-300">
          <div className="mx-auto max-w-7xl px-6 py-12">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <div>
                <div className="text-2xl font-bold text-white">
                  {t("footer.title")}
                </div>
                <p className="mt-2 max-w-xs text-sm">
                  {t("footer.description")}
                </p>
              </div>

              <div className="flex gap-8">
                <div>
                  <h4 className="font-semibold">{t("footer.product.title")}</h4>
                  <ul className="mt-3 space-y-2 text-sm text-gray-400">
                    <li>{t("footer.product.accounts")}</li>
                    <li>{t("footer.product.pricing")}</li>
                    <li>{t("footer.product.security")}</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold">{t("footer.company.title")}</h4>
                  <ul className="mt-3 space-y-2 text-sm text-gray-400">
                    <li>{t("footer.company.about")}</li>
                    <li>{t("footer.company.careers")}</li>
                    <li>{t("footer.company.blog")}</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-8 border-t border-gray-800 dark:border-white/10 pt-6 text-sm text-gray-500 dark:text-gray-400 flex flex-col md:flex-row justify-between">
              <div>
                © {new Date().getFullYear()} {t("footer.title")} -{" "}
                {t("footer.rights")}
              </div>
              <div className="mt-3 md:mt-0">{t("footer.built")}</div>
            </div>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
