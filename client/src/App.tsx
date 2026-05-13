import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { useEffect, useState } from "react";
import axios from "axios";
import Profile from "./pages/Profile";
import NavBar from "./components/NavBar";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const res = await axios.get("api/auth/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setUser(res.data);
        } catch (err) {
          console.error("Failed to fetch user data. " + err.message);
          localStorage.removeItem("token");
        }
      }
    };

    fetchUser();
  }, []);

  return (
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
          <Route path="/profile" element={<Profile user={user} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
