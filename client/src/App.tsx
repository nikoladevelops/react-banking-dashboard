import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { Suspense, useEffect, useState } from "react";
import api from "./api/axiosInstance.js";
import Profile from "./pages/Profile";
import NavBar from "./components/NavBar";
import { Navigate } from "react-router";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.data);
      } catch {
        // Not logged in or token expired
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  return (
    <Suspense fallback={<div>Loading translations...</div>}>
      <BrowserRouter>
        <div className=" bg-gray-50">
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<div>About Page</div>} />
            <Route path="/mobile" element={<div>Mobile App Page</div>} />
            <Route path="/changes" element={<div>Changes Page</div>} />
            <Route path="/help" element={<div>Help Page</div>} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/register" element={<Register setUser={setUser} />} />
            <Route
              path="/profile"
              element={
                user ? <Profile user={user} /> : <Navigate to="/login" />
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
