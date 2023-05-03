import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/components/header.css";

const Header = ({ handleCookie, token }) => {
  const [search, setSearch] = useState("");

  return (
    <header className="header-wrapper">
      <Link className="header-link-image" to="/">
        <img src={logo} alt="logo de la marque" />
      </Link>

      <input
        value={search}
        className="header-input"
        type="text"
        placeholder="Rechercher des articles"
        onChange={(event) => setSearch(event.target.value)}
      />
      {token ? (
        <div className="signout-wrapper">
          <button
            className="signout-button"
            onClick={() => {
              handleCookie(null);
            }}
          >
            Se Deconnecter
          </button>
          <Link
            className="sale-it-link-signout "
            to={token ? "/publish" : "/login"}
          >
            Vends tes article
          </Link>
        </div>
      ) : (
        <>
          <div className="auth-wrapper">
            <Link className="auth-link" to="signup">
              S'inscrire
            </Link>

            <Link className="auth-link" to="/login">
              Se connecter
            </Link>
          </div>
          <Link className="sale-it-link" to={token ? "/publish" : "/login"}>
            Vends tes articles
          </Link>
        </>
      )}
    </header>
  );
};

export default Header;
