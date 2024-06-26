import React from "react";
import "./index.scss";

const SearchBox: React.FC = () => {
  return (
    <nav className="navbar">
      <input
        className="navbar__input"
        type="text"
        placeholder="Nunca dejes de buscar"
      />
    </nav>
  );
};

export default SearchBox;
