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
  discussTime: number;
  isEnded: boolean;
} => {
  const { socket } = useSocket();
  const [players, setPlayers] = useState<User[]>([]);
  const [threeRemainCard, setThreeRemainCard] = useState<Role[]>([]);
  const [discussTime, setDiscussTime] = useState(0);
  const [isEnded, setIsEnded] = useState(false);
  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.emit("game:get:info", { code, name });

    socket.on(gameKey, (payload: any) => {
      const { players, threeRemainCard, discussTime, isEnded } = payload.game;
      setPlayers(players);
      setThreeRemainCard(threeRemainCard);
      setDiscussTime(discussTime);
      setIsEnded(isEnded);
    });

    return () => {
      socket.off(gameKey);
    };
  }, [gameKey, socket, code, name]);
  return {
    players,
    threeRemainCard,
    discussTime,
    isEnded,
  };
};
