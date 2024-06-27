import React from "react";
import { useSelector } from "react-redux";
import { selectCategories } from "../../redux/itemsSlice";
import { RootState } from "../../redux/store";
import "./index.scss";

const Breadcrumb: React.FC = () => {
  const categories = useSelector((state: RootState) => selectCategories(state));

  if (categories.length === 0) {
    return null;
  }

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb__list">
        {categories.map((category, index) => (
          <li
            key={index}
            className={`breadcrumb__item ${
              index === categories.length - 1 ? "breadcrumb__item--last" : ""
            }`}
          >
            {index !== categories.length - 1 ? (
              <span className="breadcrumb__link">{category}</span>
            ) : (
              <span aria-current="page">{category}</span>
            )}
            {index !== categories.length - 1 && " > "}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
