import { useEffect } from "react";

import { useSocket } from "../providers/socket-provider";
import { User } from "../lib/types";
import { Role } from "../lib/enums";

type StartGameSocketProps = {
  gameKey: string;
  signal: boolean;
  code: string;
  name: string;
  players: User[];
  threeRemainCard: Role[];
  discussTime: number;
};

export const useStartGameSocket = ({
  gameKey,
  signal,
  code,
  name,
  players,
  threeRemainCard,
  discussTime,
}: StartGameSocketProps) => {
  const { socket } = useSocket();
  useEffect(() => {
    if (!socket) {
      return;
    }
    if (signal) {
      socket.emit(gameKey, {
        code,
        name,
        players,
        threeRemainCard,
        discussTime,
      });
    }

    return () => {
      socket.off(gameKey);
    };
  }, [
    gameKey,
    socket,
    signal,
    code,
    name,
    players,
    threeRemainCard,
    discussTime,
  ]);
};
