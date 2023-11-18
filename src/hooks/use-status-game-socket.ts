import { useEffect, useState } from "react";

import { useSocket } from "../providers/socket-provider";
import { Game } from "../lib/types";

type StatusGameSocketProps = {
  gameKey: string;
  code: string;
  name: string;
};

export const useStatusGameSocket = ({
  gameKey,
  code,
  name,
}: StatusGameSocketProps): Game => {
  const { socket } = useSocket();
  const [game, setGame] = useState<Game>({
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

    socket.on(gameKey, (payload: Game) => {
      setGame(payload);
    });

    return () => {
      socket.off(gameKey);
    };
  }, [gameKey, socket, code, name]);
  return game;
};
