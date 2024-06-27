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
      <ul className="breadcrumb__list">
        {categories.map((category, index) => (
          <li
            key={index}
            className={`breadcrumb__item ${
              index === categories.length - 1 ? "breadcrumb__item--last" : ""
            }`}
          >
            {category}
            {index !== categories.length - 1 && " > "}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
