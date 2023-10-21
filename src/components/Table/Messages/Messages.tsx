import React, { useState } from "react";
import MessageInGame from "./Message/Message";
import { BiMessageSquareDetail } from "react-icons/bi";

import "./Messages.css";
import { useChatSocket } from "../../../hooks/use-chat-socket";
import { useSocket } from "../../../providers/socket-provider";

type MessagesProps = {
  name: string;
};

export default function MessagesInGame({ name }: MessagesProps) {
  const [messageToSend, setMessage] = useState("");
  const [sendButton, setSendButton] = useState(false);
  const { socket } = useSocket();
  
  const sendMessage = (event: React.KeyboardEvent<HTMLInputElement> | null) => {
    if (event) {
      event.preventDefault();
    }
    
    if (messageToSend) {
      socket.emit("user-message", messageToSend, () => setMessage(""));
    }
  };

  const { messages } = useChatSocket({ messageKey: "message" });

  return (
    <div className="MessagesInGame">
      <div className="MessagesInGameBody">
        {messages.map((message, index) => (
          <div key={index}>
            <MessageInGame message={message} name={name}></MessageInGame>
          </div>
        ))}
      </div>
      <div className="MessagesInGameFooter">
        <input
          type="text"
          className="MessagesInGameInput"
          placeholder="Type a message..."
          value={messageToSend}
          onChange={({ target: { value } }) => setMessage(value)}
          onKeyPress={(event) =>
            (event.key === "Enter") && (messageToSend !== "") ? sendMessage(event) : null
          }
        />
        <button
          className="MessagesInGameSendButton"
          onClick={() => {
            setSendButton(!sendButton);
            sendMessage(null);
          }}
          disabled={ messageToSend === "" ? true : false}
          >
          <BiMessageSquareDetail />
        </button>
      </div>
    </div>
  );
}
