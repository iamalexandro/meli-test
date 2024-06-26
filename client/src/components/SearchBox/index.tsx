import React from "react";
import "./index.scss";

const SearchIconUrl = `${process.env.PUBLIC_URL}/images/ic-search-2x.png`;
const MeliIconUrl = `${process.env.PUBLIC_URL}/images/logo-ml-2x.png`;

interface SearchProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
}

const Search: React.FC<SearchProps> = ({ query, setQuery, handleSearch }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <nav className="navbar" onKeyDown={handleKeyDown}>
      <img className="navbar__logo-meli" src={MeliIconUrl} alt="" />
      <input
        autoFocus
        className="navbar__input"
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Nunca dejes de buscar"
      />
      <button
        style={{ backgroundImage: `url(${SearchIconUrl}) ` }}
        className="navbar__btn-search"
        onClick={handleSearch}
      ></button>
    </nav>
  );
};

export default Search;
