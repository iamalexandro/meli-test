import React from "react";
import { useAppSelector } from "../../redux/hooks";
import {
  selectItemSelected,
  selectLoading,
  selectDescriptionItemSelected,
} from "../../redux/itemsSlice";
import Loader from "../Loader";
import "./index.scss";

const ItemsList: React.FC = () => {
  const item = useAppSelector(selectItemSelected);
  const description = useAppSelector(selectDescriptionItemSelected);
  const loading = useAppSelector(selectLoading);

  return (
    <div
      className="detail"
      style={{
        padding: item ? "32px" : 0,
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
          {item != null && (
            <div className="detail__container">
              <div className="detail__left">
                <div className="detail__left-img-container">
                  <img
                    src={item.picture}
                    alt={item.title}
                    style={{ width: "100%", maxWidth: "680px" }}
                  />
                </div>
                <p className="detail__left-description-title">
                  Descripción del producto
                </p>
                <p className="detail__left-description">{description}</p>
              </div>
              <div className="detail__right no-margin">
                <p className="detail__right-new no-margin">
                  {item.condition ? "Nuevo" : "Usado"} - {item.initial_quantity}{" "}
                  vendidos{" "}
                </p>
                <p className="detail__right-title no-margin">{item.title}</p>
                <p className="detail__right-price no-margin">
                  $ {item.price.amount.toLocaleString()} {item.price.currency}
                </p>
                <button className="detail__right-btn">Comprar</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ItemsList;
