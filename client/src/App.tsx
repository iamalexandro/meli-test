import React, { useState } from "react";
import { useAppDispatch } from "./redux/hooks";
import { fetchItems } from "./redux/itemsSlice";
import SearchBox from "./components/SearchBox";

import "./App.scss";
import DashboardPage from "./pages/DashboardPage";
import ItemDetailPage from "./pages/ItemDetailPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Breadcrumb from "./components/Breadcrumb";

function App() {
  const [query, setQuery] = useState("");
  const dispatch = useAppDispatch();

  const handleSearch = () => {
    dispatch(fetchItems(query));
  };
  return (
    <Router>
      <div className="App">
        <SearchBox
          query={query}
          setQuery={setQuery}
          handleSearch={handleSearch}
        />
        <Breadcrumb />
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/itemDetail" element={<ItemDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
