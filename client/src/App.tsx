import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { useEffect } from "react";
import Profile from "./pages/Profile";
import NavBar from "./components/NavBar";
import { useUserStore } from "./userStore.js";
import ProtectedRoute from "./components/ProtectedRoute.js";
import GuestOnlyRoute from "./components/GuestOnlyRoute.js";

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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
