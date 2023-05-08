import logo from "../images/logo.png";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "../styles/components/header.css";
import "../styles/components/ToggleButton.css";
import { RangeFilter } from "./RangeFilter";

const Header = ({
  handleCookie,
  token,
  onChangeRangeValues,
  onChangeRangeValuesIsActive,
  rangeValuesIsActive,
}) => {
  const [search, setSearch] = useState("");
  const location = useLocation();

  return (
    <header className="header-wrapper">
      <div className="header-search">
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
      </div>
      {location.pathname === "/" && (
        <div className="header-filter">
          <div className="price-filter">
            <p>Tier par prix: </p>
            <label className="switch">
              <input
                onClick={onChangeRangeValuesIsActive}
                value={rangeValuesIsActive}
                type="checkbox"
              />
              <span className="slider round"></span>
            </label>
          </div>
          <div className="range-filter">
            <p>Prix entre: </p>
            <RangeFilter
              setRangeValues={(values) => onChangeRangeValues(values)}
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
