import React from "react";
import Message from "./Message/Message";
import { BiMessageSquareDetail } from "react-icons/bi";

import "./Messages.css";

type MessagesProps = {
  messages: {
    user: string;
    text: string;
  }[]
  name: string;
}

export default function Messages({messages, name}: MessagesProps) {
  return (
    <div className="Messages">
      <div className="MessageBody">
        {messages.map((message, index) => (
          <div key={index}>
            <Message message={message} name={name}></Message>
          </div>
        ))}
      </div>
      <div className="MessageFooter">
        <input
          type="text"
          className="MessageInput"
          placeholder="Enter the message"
        />
        <button className="MessageSendButton">
          <BiMessageSquareDetail />
        </button>
      </div>
    </div>
  );
}
