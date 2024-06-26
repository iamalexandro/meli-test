import React from "react";
import { useAppSelector } from "../../redux/hooks";
import {
  selectItemSelected,
  selectLoading,
  selectDescriptionItemSelected,
} from "../../redux/itemsSlice";
import Loader from "../Loader";

const ItemsList: React.FC = () => {
  const item = useAppSelector(selectItemSelected);
  const description = useAppSelector(selectDescriptionItemSelected);
  const loading = useAppSelector(selectLoading);

  return (
    <div>
      {loading ? (
        <div className="cards__loader">
          <Loader />
          <h3>Cargando...</h3>
        </div>
      ) : (
        <>
          {item != null && (
            <div
              key={item.id}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <h2>{item.title}</h2>
              <img
                src={item.picture}
                alt={item.title}
                style={{ width: "100px", height: "100px" }}
              />
              <p>
                {item.isNew ? "Nuevo" : "Usado"} - {item.salesCount} vendidos{" "}
              </p>
              <p>
                Precio: $ {item.price.amount.toLocaleString()}{" "}
                {item.price.currency}
              </p>
              <h3>Descripccion del producto</h3>
              <p>{description}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ItemsList;
