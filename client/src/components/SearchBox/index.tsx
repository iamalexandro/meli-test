import React from "react";
import "./index.scss";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SearchIconUrl = `${process.env.PUBLIC_URL}/images/ic-search-2x.png`;
const MeliIconUrl = `${process.env.PUBLIC_URL}/images/logo-ml-2x.png`;

interface SearchProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
}

const Search: React.FC<SearchProps> = ({ query, setQuery, handleSearch }) => {
  const navigate = useNavigate();
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      handleSearch();
      navigate("/");
    }
  };

  return (
    <nav className="navbar" onKeyDown={handleKeyDown} role="search">
      <Link to="/" aria-label="Ir a la página principal">
        <img
          className="navbar__logo-meli"
          src={MeliIconUrl}
          alt="Logo de Mercado Libre"
        />
      </Link>
      <input
        autoFocus
        className="navbar__input"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Nunca dejes de buscar"
        aria-label="Buscar productos"
      />
      <button
        style={{ backgroundImage: `url(${SearchIconUrl}) ` }}
        className="navbar__btn-search"
        onClick={handleSearch}
        aria-label="Buscar"
      ></button>
    </nav>
  );
};

export default Search;
