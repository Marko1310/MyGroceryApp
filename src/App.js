import React, { useState, useEffect } from "react";
import List from "./components/List";
import Alert from "./components/Alert";
import Navbar from "./components/Navbar";
import Submit from "./components/Submit";

function App() {
  return (
    <div>
      <Navbar />
      <div className="main-container">
        <Alert />
        <Submit />
        <List />
      </div>

      {/* <div className="section-center"></div>;
      <div className="section-center"></div>; */}
    </div>
  );
}

export default App;
