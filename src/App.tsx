import React from "react";
import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Join from "./components/Join/Join";
import Game from "./components/Game/Game";
import { SocketProvider } from "./providers/socket-provider";

function App() {
  return (
    <div className="App">
      <div className="bg-image"></div>
      <SocketProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/room" element={<Join />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </BrowserRouter>
      </SocketProvider>
    </div>
  );
}

export default App;
