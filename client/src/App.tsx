import "./App.css";
import React, { useState } from "react";
import axios from "axios";
import Dashboard from "./components/Dashboard";
// import SearchBox from "./components/SearchBox";

function App() {
  return (
    <div className="App">
      <Dashboard></Dashboard>
    </div>
  );
}

export default App;
