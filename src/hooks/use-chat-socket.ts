import { useEffect } from "react";

import { useSocket } from "../providers/socket-provider";


type ChatSocketProps = {
    messageKey: string;
}


export const useChatSocket = ({
  messageKey
}: ChatSocketProps) => {
  const { socket } = useSocket();

  useEffect(() => {
    if (!socket) {
      return;
    }
    
    return () => {
      socket.off(messageKey);
    }
  }, [messageKey, socket]);
}