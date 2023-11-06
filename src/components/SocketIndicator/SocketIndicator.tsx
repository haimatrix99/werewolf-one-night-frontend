import React from "react";
import { useSocket } from "../../providers/socket-provider";

export default function SocketIndicator() {
  const { isConnected } = useSocket();

  return (
    <>
      {isConnected ? (
        <div className="absolute top-0 left-0 ml-2 mt-2">
          <div className="flex justify-between items-center px-2 py-1 gap-2 md:border-2 md:border-solid md:border-white md:rounded-lg  md:bg-indigo-500">
            <span className="w-4 h-4 rounded-full border border-solid bg-green-500"></span>
            <span className="text-lg text-white font-semibold hidden md:inline-block">
              Connected
            </span>
          </div>
        </div>
      ) : (
        <div className="absolute top-0 left-0">
          <div className="flex justify-between items-center px-2 py-1 gap-2 md:border-2 md:border-solid md:border-white md:rounded-lg  md:bg-indigo-500">
            <span className="w-4 h-4 rounded-full border border-solid bg-red-500"></span>
            <span className="text-lg text-white font-semibold hidden md:inline-block">
              Disconnected
            </span>
          </div>
        </div>
      )}
    </>
  );
}
