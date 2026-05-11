import { BrowserRouter, Routes, Route, Link } from "react-router";
import fibankLogo from "./assets/fibank-logo.png";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <div className=" bg-gray-50">
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
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
                </div>

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
              </div>
            </div>
          </nav>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<div>About Page</div>} />
          <Route path="/mobile" element={<div>Mobile App Page</div>} />
          <Route path="/changes" element={<div>Changes Page</div>} />
          <Route path="/help" element={<div>Help Page</div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
