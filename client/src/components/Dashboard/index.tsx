import React, { useState } from "react";
// import Dashboard from "./components/Dashboard";
// import SearchBox from "./components/SearchBox";
import Loader from "../Loader";
import "./index.scss";

// redux
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchItems, selectItems, selectLoading } from "../../redux/itemsSlice";

const SearchIconUrl = `${process.env.PUBLIC_URL}/images/ic-search-2x.png`;
const MeliIconUrl = `${process.env.PUBLIC_URL}/images/logo-ml-2x.png`;

const Dashboard: React.FC = () => {
  const [query, setQuery] = useState("");
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectItems);
  const loading = useAppSelector(selectLoading);

  const handleSearch = () => {
    dispatch(fetchItems(query));
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div onKeyDown={handleKeyDown}>
      <nav className="navbar">
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
      <ul
        className="cards"
        style={{
          padding: items.length > 0 ? "0 2rem" : 0,
          backgroundColor: loading ? "#eeeeee" : "",
        }}
      >
        {loading ? (
          <div className="cards__loader">
            <Loader />
            <h3>Cargando...</h3>
          </div>
        ) : (
          <>
            {items.map(
              (item) =>
                item != null && (
                  <li key={item.id} className="cards__item flex">
                    <div>
                      <img
                        className="cards__item__picture"
                        src={item.picture}
                        alt={item.title}
                      />
                    </div>
                    <div className="cards__item__info">
                      <p className="cards__item__info--price">
                        $ {item.price.amount.toLocaleString()}{" "}
                        {item.free_shipping}
                      </p>
                      <p className="cards__item__info--title">{item.title}</p>
                    </div>
                    <div className="cards__item__city">Capital Federal</div>
                  </li>
                )
            )}
          </>
        )}
      </ul>
    </div>
  );
};

export default Dashboard;
