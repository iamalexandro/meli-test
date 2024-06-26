import React from "react";
import { useAppSelector } from "../../redux/hooks";
import { selectItems, selectLoading } from "../../redux/itemsSlice";
import Loader from "../Loader";
import "./index.scss";

interface ListItemsProps {
  handleFetchItemById: (id: string) => void;
}

const ListItems: React.FC<ListItemsProps> = ({ handleFetchItemById }) => {
  const items = useAppSelector(selectItems);
  const loading = useAppSelector(selectLoading);

  return (
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
                <li
                  key={item.id}
                  className="cards__item flex"
                  onClick={() => handleFetchItemById(item.id)}
                >
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
  );
};

export default ListItems;
