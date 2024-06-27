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
        <div className="cards__loader" aria-live="polite">
          <Loader />
          <h3>Cargando...</h3>
        </div>
      ) : (
        <>
          {item != null && (
            <article className="detail__container">
              <section className="detail__left">
                <div className="detail__left-img-container">
                  <img
                    src={item.picture}
                    alt={`Imagen de ${item.title}`}
                    style={{ width: "100%", maxWidth: "680px" }}
                  />
                </div>
                <h2 className="detail__left-description-title">
                  Descripción del producto
                </h2>
                <p className="detail__left-description">{description}</p>
              </section>
              <section className="detail__right no-margin">
                <p className="detail__right-new no-margin">
                  {item.condition ? "Nuevo" : "Usado"} - {item.initial_quantity}{" "}
                  vendidos
                </p>
                <h1 className="detail__right-title no-margin">{item.title}</h1>
                <p className="detail__right-price no-margin">
                  $ {item.price.amount.toLocaleString()} {item.price.currency}
                </p>
                <button className="detail__right-btn">Comprar</button>
              </section>
            </article>
          )}
        </>
      )}
    </div>
  );
};

export default ItemsList;
