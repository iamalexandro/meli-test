import React from "react";
import "./index.scss";

const Loader: React.FC = () => {
  return (
    <div className="loader">
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
      <div className="line"></div>
    </div>
  );
};
export default Loader;
