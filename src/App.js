import "./App.css";
//package pour naviguer entre pages
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// package pour créer les states
import { useState } from "react";
//utilisation du package js-cookie dans signup et login
import Cookies from "js-cookie";

//pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";

//components
import Header from "./components/Header";

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
        <Route path="/" element={<Home token={token} />} />
        <Route path="/offer/:id" element={<Offer />} />
        <Route
          path="/signup"
          element={<Signup handleCookie={handleCookie} />}
        />
        <Route path="/login" element={<Login handleCookie={handleCookie} />} />
        <Route path="/publish" element={<Publish token={token} />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Router>
  );
}

export default App;
