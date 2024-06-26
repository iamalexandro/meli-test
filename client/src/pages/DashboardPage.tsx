import React, { useState } from "react";
import ListItems from "../components/ListItems";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { fetchItemById, fetchItemDescription } from "../redux/itemsSlice";

const DashboardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleFetchItemById = (id: string) => {
    dispatch(fetchItemById(id));
    dispatch(fetchItemDescription(id));
    navigate("/itemDetail");
  };

  return (
    <div>
      <ListItems handleFetchItemById={handleFetchItemById} />
    </div>
  );
};

export default DashboardPage;
