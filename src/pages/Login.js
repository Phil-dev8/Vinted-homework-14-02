import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

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
    <div>
      <h1>Se connecter</h1>
      <form
        onSubmit={handleLogin}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <input
          type="email"
          placeholder="Votre email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Votre mot de passe"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <input type="submit" value="Se connecter" />
      </form>
      <Link to="/signup">
        Pas encore de compte? Inscris-toi en cliquant <span>ici</span> !
      </Link>
    </div>
  );
};

export default Login;
