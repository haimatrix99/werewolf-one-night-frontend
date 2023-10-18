import React from "react";
import Message from "./Message/Message";
import { BiMessageSquareDetail } from "react-icons/bi";

import "./Messages.css";

export default function Messages() {
  const name = "test";
  const messages = [
    {
      user: "test",
      text: "Hello 1",
    },
    {
      user: "test2",
      text: "Hello 2",
    },
    {
      user: "test3",
      text: "Hello 3",
    },
    {
      user: "test4",
      text: "Hello 4",
    },
    {
      user: "test",
      text: "Hello 5"
    },
    {
      user: "test",
      text: "Hello 6"
    }
  ];
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
