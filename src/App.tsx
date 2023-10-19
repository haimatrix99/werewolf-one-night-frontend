import React from "react";
import "./App.css";
import Game from "./components/Game/Game";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Join from "./components/Join/Join";

function App() {
  return (
    <div className="App">
      <div className="bg-image"></div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/join" element={<Join />} />
          <Route path="game" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
