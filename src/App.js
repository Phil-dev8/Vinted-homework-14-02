import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//utilisation du package js-cookie dans signup et login
import Cookies from "js-cookie";

//pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";

//components
import Header from "./components/Header";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(Cookies.get("auth-token") || null);
  const handleCookie = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("auth-token", token, { expires: 3 });
    } else {
      setToken(null);
      Cookies.remove("auth-token");
    }
  };

  return (
    <Router>
      <Header handleCookie={handleCookie} token={token} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route
          path="/signup"
          element={<Signup handleCookie={handleCookie} />}
        />
        <Route path="/login" element={<Login handleCookie={handleCookie} />} />
        <Route path="/publish" element={<Publish token={token} />} />
      </Routes>
    </Router>
  );
}

export default App;
