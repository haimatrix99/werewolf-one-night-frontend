import { useEffect, useState } from "react";

import { useSocket } from "../providers/socket-provider";
import { User } from "../lib/types";

type UserSocketProps = {
  userKey: string;
};

type Users = {
  users: User[]
}
export const useUserSocket = ({ userKey }: UserSocketProps) => {
  const { socket } = useSocket();
  const [usersOnline, setUsersOnline] = useState<Users>({users: []});

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on(userKey, (users: Users) => {
      console.log(users)
      setUsersOnline(users);
    });
    return () => {
      socket.off(userKey);
    };
  }, [usersOnline, userKey, socket]);
  return usersOnline
};
