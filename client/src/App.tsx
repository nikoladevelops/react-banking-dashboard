import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { useEffect } from "react";
import Profile from "./pages/Profile";
import NavBar from "./components/NavBar";
import { Navigate } from "react-router";
import { useUserStore } from "./userStore.js";

function App() {
  const user = useUserStore((state) => state.user);
  const fetchUser = useUserStore((state) => state.fetchUser);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  if (user === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <div className="text-black dark:text-white">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<div>About Page</div>} />
          <Route path="/mobile" element={<div>Mobile App Page</div>} />
          <Route path="/changes" element={<div>Changes Page</div>} />
          <Route path="/help" element={<div>Help Page</div>} />
          <Route
            path="/login"
            element={user ? <Navigate to="/" replace /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/" replace /> : <Register />}
          />
          <Route
            path="/profile"
            element={user ? <Profile /> : <Navigate to="/login" replace />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
