import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "../styles/pages/Login.css";

const Login = ({ handleCookie }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );
      console.log(response.data);
      if (response.data.token) {
        handleCookie(response.data.token);
        console.log(response.data.token);
        navigate("/");
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-content">
        <h1 className="login-title">Se connecter</h1>
        <form onSubmit={handleLogin} className="login-form">
          <input
            className="login-input"
            type="email"
            placeholder="Adresse email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <input
            className="login-input"
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <input className="login-submit" type="submit" value="Se connecter" />
        </form>
        <Link className="signup-link" to="/signup">
          Pas encore de compte? Inscris-toi !
        </Link>
      </div>
    </div>
  );
};

export default Login;
