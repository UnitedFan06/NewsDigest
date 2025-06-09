import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import PreferencesForm from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Favorites from "./pages/Favorites";
import { useState, useEffect } from "react";

const getUserFromStorage = () => JSON.parse(localStorage.getItem("user"));

function App() {
  const [user, setUser] = useState(getUserFromStorage);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/home" /> : <Login setUser={setUser} />} />
        <Route path="/signup" element={user ? <Navigate to="/home" /> : <Signup setUser={setUser} />} />
        <Route
          path="/home"
          element={user ? <Home favorites={favorites} setFavorites={setFavorites} /> : <Navigate to="/" />}
        />
        <Route path="/profile" element={user ? <PreferencesForm /> : <Navigate to="/" />} />
        <Route
          path="/favorites"
          element={user ? <Favorites favorites={favorites} setFavorites={setFavorites} /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
