import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";
import Header from "./components/Header";
import { DEFAULT_RANGE_VALUES } from "./components/RangeFilter";
import "./App.css";

function App() {
  const [token, setToken] = useState(Cookies.get("auth-token") || null);
  const [rangeValues, setRangeValues] = useState(DEFAULT_RANGE_VALUES);
  const [rangeValuesIsActive, setRangeValuesIsActive] = useState(false);

  const handleCookie = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("auth-token", token, { expires: 3 });
    } else {
      setToken(null);
      Cookies.remove("auth-token");
    }
  };

  const onChangeRangeValues = (newRangeValues) =>
    setRangeValues(newRangeValues);

  const onChangeRangeValuesIsActive = () =>
    setRangeValuesIsActive((prev) => !prev);

  return (
    <Router>
      <Header
        handleCookie={handleCookie}
        token={token}
        onChangeRangeValues={onChangeRangeValues}
        onChangeRangeValuesIsActive={onChangeRangeValuesIsActive}
        rangeValuesIsActive={rangeValuesIsActive}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              token={token}
              rangeValues={rangeValues}
              rangeValuesIsActive={rangeValuesIsActive}
            />
          }
        />
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
