import React from "react";
import "./App.css";
import Game from "./components/Game/Game";
import Join from "./components/Join/Join";
import { Route, BrowserRouter, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Game />} />
          <Route path="game" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
