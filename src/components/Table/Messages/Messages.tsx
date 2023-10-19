import React, { useState } from "react";
import MessageInGame from "./Message/Message";
import { BiMessageSquareDetail } from "react-icons/bi";

import "./Messages.css";

type MessagesProps = {
  messages: {
    user: string;
    text: string;
  }[];
  name: string;
};

export default function MessagesInGame({ messages, name }: MessagesProps) {
  const [messageToSend, setMessage] = useState("");
  const [sendButton, setSendButton] = useState(false);

  const sendMessage = (event: React.KeyboardEvent<HTMLInputElement> | null) => {
    if (event) {
      event.preventDefault();
    }
    
    const users = ['test', 'test2', 'test3']
    const message = {
      user: users[Math.floor(Math.random()*users.length)],
      text: messageToSend,
    };
    messages.unshift(message);
    setMessage("");
  };

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
