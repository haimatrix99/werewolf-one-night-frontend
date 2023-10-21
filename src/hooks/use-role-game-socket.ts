import { useEffect, useState } from "react";

import { useSocket } from "../providers/socket-provider";
import { User } from "../lib/types";
import { Role } from "../lib/enums";

type RoleGameSocketProps = {
  roleKey: string;
  code: string;
};

export const useRoleGameSocket = ({
  roleKey,
  code,
}: RoleGameSocketProps): { rolesPlayer: User[]; threeRemainCard: Role[] } => {
  const { socket } = useSocket();
  const [rolesPlayer, setRolesPlayer] = useState<User[]>([]);
  const [threeRemainCard, setThreeRemainCard] = useState<Role[]>([]);
  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.emit("get-game-info", { code });

    socket.on(roleKey, (payload: any) => {
      const { rolesPlayer, threeRemainCard } = payload.game;
      setRolesPlayer(rolesPlayer);
      setThreeRemainCard(threeRemainCard);
    });

    return () => {
      socket.off(roleKey);
    };
  }, [roleKey, socket, code]);
  return {
    rolesPlayer,
    threeRemainCard,
  };
};
