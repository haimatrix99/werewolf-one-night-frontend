import { useEffect } from "react";

import { useSocket } from "../providers/socket-provider";

type GameSocketProps = {
  gameKey: string;
};

export const useGameSocket = ({ gameKey }: GameSocketProps) => {
  const { socket } = useSocket();


  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on(gameKey, () => {});
    return () => {
      socket.off(gameKey);
    };
  }, [gameKey, socket]);
  // return {
  //   rolesPool,
  //   currentUserRole
  // }
};
