import React, { useState } from "react";
import Message from "./Message/Message";
import { BiMessageSquareDetail } from "react-icons/bi";

import "./Messages.css";

type MessagesProps = {
  messages: {
    user: string;
    text: string;
  }[];
  name: string;
};

export default function MessagesInRoom({ messages, name }: MessagesProps) {
  const [messageToSend, setMessage] = useState("");
  const [sendButton, setSendButton] = useState(false);

  const sendMessage = (event: React.KeyboardEvent<HTMLInputElement> | null) => {
    if (event) {
      event.preventDefault();
    }

    const users = ["test", "test2", "test3"];
    const message = {
      user: users[Math.floor(Math.random() * users.length)],
      text: messageToSend,
    };
    messages.unshift(message);
    setMessage("");
  };

  return (
    <div className="MessagesInRoom">
      <div className="RoomInfo">
        <span className="RoomInfoText">Room ID: 1SFAT2</span>
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
