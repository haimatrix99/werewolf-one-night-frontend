import React, { useState } from "react";
import Message from "./Message/Message";
import { BiMessageSquareDetail } from "react-icons/bi";

import "./Messages.css";
import { useSocket } from "../../../providers/socket-provider";
import { useChatSocket } from "../../../hooks/use-chat-socket";
import { BsFillClipboard2Fill } from 'react-icons/bs'

type MessagesProps = {
  name: string;
  code: string | undefined;
};

export default function MessagesInRoom({ name, code }: MessagesProps) {
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

  const copy = () => {
    navigator.clipboard.writeText(code as string);
    alert("Copied!")
  };

  return (
    <div className="MessagesInRoom">
      <div className="RoomInfo">
        <span className="RoomInfoText">Room ID: {code}</span>
        <button className="ClipboardIcon" onClick={copy}>
          <BsFillClipboard2Fill />
        </button>
      </div>
      <div className="MessagesInRoomBody">
        {messages.map((message, index) => (
          <div key={index}>
            <Message message={message} name={name}></Message>
          </div>
        ))}
      </div>
      <div className="MessagesInRoomFooter">
        <input
          type="text"
          className="MessagesInRoomInput"
          placeholder="Type a message..."
          value={messageToSend}
          onChange={({ target: { value } }) => setMessage(value)}
          onKeyPress={(event) =>
            event.key === "Enter" && messageToSend !== ""
              ? sendMessage(event)
              : null
          }
        />
        <button
          className="MessagesInRoomSendButton"
          onClick={() => {
            setSendButton(!sendButton);
            sendMessage(null);
          }}
          disabled={messageToSend === "" ? true : false}
        >
          <BiMessageSquareDetail />
        </button>
      </div>
    </div>
  );
}
