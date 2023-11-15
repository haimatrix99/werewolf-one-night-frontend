import { useEffect, useState } from "react";

import { useSocket } from "../providers/socket-provider";
import { User } from "../lib/types";
import { Role } from "../lib/enums";

type StatusGameSocketProps = {
  gameKey: string;
  code: string;
  name: string;
};

export const useStatusGameSocket = ({
  gameKey,
  code,
  name,
}: StatusGameSocketProps): {
  players: User[];
  threeRemainCard: Role[];
  discussTime: string;
  isEnded: boolean;
} => {
  const { socket } = useSocket();
  const [game, setGame] = useState<{
    players: User[];
    threeRemainCard: Role[];
    discussTime: string;
    isEnded: boolean;
  }>({
    players: [],
    threeRemainCard: [],
    discussTime: "10",
    isEnded: false,
  });
  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.emit("game:get:info", { code, name });

    socket.on(gameKey, (payload: any) => {
      const { players, threeRemainCard, discussTime, isEnded } = payload.game;
      setGame({
        players,
        threeRemainCard,
        discussTime,
        isEnded,
      });
    });

    return () => {
      socket.off(gameKey);
    };
  }, [gameKey, socket, code, name]);
  return game;
};
