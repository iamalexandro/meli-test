import React, { useState } from "react";
import SearchBox from "../SearchBox";
import ListItems from "../Items";
import "./index.scss";

// redux
import { useAppDispatch } from "../../redux/hooks";
import { fetchItems } from "../../redux/itemsSlice";

const Dashboard: React.FC = () => {
  const [query, setQuery] = useState("");
  const dispatch = useAppDispatch();

  const handleSearch = () => {
    dispatch(fetchItems(query));
  };

  return (
    <div>
      <SearchBox
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
      />
      <ListItems />
    </div>
  );
};

export default Dashboard;
