import React from "react";
import { useAppSelector } from "../../redux/hooks";
import { selectItems, selectLoading } from "../../redux/itemsSlice";
import Loader from "../Loader";
import "./index.scss";
const FreeShippingIcon = `${process.env.PUBLIC_URL}/images/ic-shipping2x.png`;

interface ListItemsProps {
  handleFetchItemById: (id: string) => void;
}

const ListItems: React.FC<ListItemsProps> = ({ handleFetchItemById }) => {
  const items = useAppSelector(selectItems);
  const loading = useAppSelector(selectLoading);

  return (
    <div className="cards-container" aria-busy={loading} aria-live="polite">
      {loading ? (
        <div className="cards__loader">
          <Loader />
          <h3>Cargando...</h3>
        </div>
      ) : (
        <ul
          className="cards"
          style={{
            padding: items.length > 0 ? "0 2rem" : 0,
            backgroundColor: loading ? "#eeeeee" : "",
          }}
        >
          {items.map(
            (item) =>
              item != null && (
                <li key={item.id}>
                  <button
                    onClick={() => handleFetchItemById(item.id)}
                    className="cards__item flex"
                    aria-label={`Ver detalles de ${item.title}`}
                  >
                    <div>
                      <img
                        className="cards__item__picture"
                        src={item.picture}
                        alt={`Imagen de ${item.title}`}
                      />
                    </div>
                    <div className="cards__item__info">
                      <p className="cards__item__info--price">
                        $ {item.price.amount.toLocaleString()}{" "}
                        {item.free_shipping && (
                          <img
                            className="cards__item__info--shipping"
                            src={FreeShippingIcon}
                            alt="Envío gratis"
                          />
                        )}
                      </p>
                      <p className="cards__item__info--title">{item.title}</p>
                    </div>
                    <div className="cards__item__city">Capital Federal</div>
                  </button>
                </li>
              )
          )}
        </ul>
      )}
    </div>
  );
};

export default ListItems;
