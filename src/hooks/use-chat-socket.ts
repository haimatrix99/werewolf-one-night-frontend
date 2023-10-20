import { useEffect, useState } from "react";

import { useSocket } from "../providers/socket-provider";
import { MessageInfo } from "../lib/types";

type ChatSocketProps = {
  messageKey: string;
};

export const useChatSocket = ({ messageKey }: ChatSocketProps) => {
  const { socket } = useSocket();
  const [messages, setMessages] = useState<MessageInfo[]>([]);

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.on(messageKey, (message: MessageInfo) => {
      setMessages((messages) => [message, ...messages]);
    });
    return () => {
      socket.off(messageKey);
    };
  }, [messages, messageKey, socket]);
  return {
    messages
  }
};
