import { useEffect, useState } from "react";

import { useSocket } from "../providers/socket-provider";

export const useGameSetupSocket = (
  gameKey: string
): {
  userNumbers: number[];
  userDiscussTime: string;
} => {
  const { socket } = useSocket();
  const [gameSetup, setGameSetup] = useState({
    userDiscussTime: "10",
    userNumbers: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  });

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on(gameKey, (payload: any) => {
      const { numbers, discussTime } = payload;
      setGameSetup({ userNumbers: numbers, userDiscussTime: discussTime });
    });

    return () => {
      socket.off(gameKey);
    };
  }, [gameKey, socket]);

  return gameSetup;
};
