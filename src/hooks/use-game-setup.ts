import { useEffect, useState } from "react";

import { useSocket } from "../providers/socket-provider";

export const useGameSetupSocket = (
  gameKey: string
): {
  userNumbers: number[];
  userDiscussTime: string;
} => {
  const { socket } = useSocket();
  const [userDiscussTime, setUserDiscussTime] = useState("10");
  const [userNumbers, setUserNumbers] = useState([
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]);

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on(gameKey, (payload: any) => {
      const { numbers, discussTime } = payload;
      setUserDiscussTime(discussTime);
      setUserNumbers(numbers);
    });

    return () => {
      socket.off(gameKey);
    };
  }, [gameKey, socket]);

  return {
    userNumbers,
    userDiscussTime,
  };
};
