import { useEffect, useState } from "react";

import { useSocket } from "../providers/socket-provider";
type GameSocketProps = {
  gameKey: string;
};

export const useGameSocket = ({ gameKey }: GameSocketProps) => {
  const { socket } = useSocket();
  const [startGame, setStartGame] = useState(false);
  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on(gameKey, (startGame: boolean) => {
      setStartGame(startGame);
    });
    return () => {
      socket.off(gameKey);
    };
  }, [gameKey, socket]);
  return {
    startGame,
  };
};
