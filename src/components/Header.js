import logo from "../images/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = ({ handleCookie, token }) => {
  const [search, setSearch] = useState("");

  return (
    <header>
      <div className="header">
        <Link to="/">
          <img src={logo} alt="logo de la marque" />
        </Link>

        <input
          value={search}
          className="header-input"
          type="text"
          placeholder="Rechercher des articles"
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
      {token ? (
        <div className="button">
          <button
            className="signout-button"
            onClick={() => {
              handleCookie(null);
            }}
          >
            Se Deconnecter
          </button>
          <Link to={token ? "/publish" : "/login"}>
            <button className="sale-it">Vends tes articles</button>
          </Link>
        </div>
      ) : (
        <>
          <div className="button">
            <Link to="signup">
              <button className="signin-button">S'inscrire</button>
            </Link>

            <Link to="/login">
              <button className="login-button">Se connecter</button>
            </Link>
          </div>
          <Link to={token ? "/publish" : "/login"}>
            <button className="sale-it">Vends tes articles</button>
          </Link>
        </>
      )}
    </header>
  );
};

export default Header;
