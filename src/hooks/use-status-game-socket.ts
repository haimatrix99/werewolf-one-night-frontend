import { useEffect, useState } from "react";

import { useSocket } from "../providers/socket-provider";
import { User } from "../lib/types";
import { Role } from "../lib/enums";

type StatusGameSocketProps = {
  roleKey: string;
  code: string;
};

export const useStatusGameSocket = ({
  roleKey,
  code,
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
    socket.emit("get-game-info", { code });

    socket.on(roleKey, (payload: any) => {
      const { players, threeRemainCard, discussTime, isEnded } = payload.game;
      setPlayers(players);
      setThreeRemainCard(threeRemainCard);
      setDiscussTime(discussTime);
      setIsEnded(isEnded);
    });

    return () => {
      socket.off(roleKey);
    };
  }, [roleKey, socket, code]);
  return {
    players,
    threeRemainCard,
    discussTime,
    isEnded,
  };
};
