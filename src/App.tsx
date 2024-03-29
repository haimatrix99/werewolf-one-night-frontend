import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Join from "./components/Join/Join";
import Game from "./components/Game/Game";
import { SocketProvider } from "./providers/socket-provider";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="relative h-screen bg-slate-200 overflow-x-hidden">
      <SocketProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/room" element={<Join />} />
            <Route path="/game" element={<Game />} />
          </Routes>
        </BrowserRouter>
      </SocketProvider>
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          className: "",
          duration: 3000,
          style: {
            background: "#6366f1",
            color: "#fff",
          },
        }}
      />
    </div>
  );
}

export default App;
