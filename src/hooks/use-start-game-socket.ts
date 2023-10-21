import { useEffect } from "react";

import { useSocket } from "../providers/socket-provider";
import { User } from "../lib/types";
import { Role } from "../lib/enums";

type StartGameSocketProps = {
  gameKey: string;
  signal: boolean;
  rolesPlayer: User[];
  threeRemainCard: Role[];
};

export const useStartGameSocket = ({
  gameKey,
  signal,
  rolesPlayer,
  threeRemainCard
}: StartGameSocketProps) => {
  const { socket } = useSocket();
  useEffect(() => {
    if (!socket) {
      return;
    }
    if (signal) {
      socket.emit("game", {rolesPlayer, threeRemainCard});
    }

    return () => {
      socket.off(gameKey);
    };
  }, [gameKey, socket, signal, rolesPlayer, threeRemainCard]);
};
