import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/pages/Signup.css";
import toast, { Toaster } from "react-hot-toast";

const Signup = ({ handleCookie }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          email: email,
          username: username,
          password: password,
          newsletter: newsletter,
        }
      );
      if (response.data.token) {
        handleCookie(response.data.token);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="signup-wrapper">
      <Toaster />
      <div className="signup-content">
        <h1 className="signup-title">S'inscrire</h1>
        <form onSubmit={handleSignup} className="signup-form">
          <input
            className="input-signup"
            value={username}
            type="text"
            placeholder="Nom d'utilisateur"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input
            className="input-signup"
            value={email}
            type="email"
            placeholder="Email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <input
            className="input-signup"
            value={password}
            type="password"
            placeholder="Mot de passe"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <div className="newsletter-wrapper">
            <input
              className="newsletter-checkbox"
              checked={newsletter}
              type="checkbox"
              onChange={() => {
                setNewsletter(!newsletter);
              }}
            />
            <p className="newsletter-text">S'inscrire a la newsletter</p>
          </div>
          <p className="cgu-description">
            En m'inscrivant je confirme avoir lu et accepté les Terme &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
          <input
            className="signup-submit"
            type="submit"
            value="S'enregistrer !"
            style={{ backgroundColor: "#2aaeb7" }}
          />
          {errorMessage && <p>{errorMessage}</p>}
        </form>
        <Link className="login-link" to="/login">
          Tu as déjà un compte? Connecte-toi !
        </Link>
      </div>
    </div>
  );
};

export default Signup;
