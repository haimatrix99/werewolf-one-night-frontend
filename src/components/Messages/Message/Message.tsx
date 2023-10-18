import React from "react";
import "./Message.css";

type MessageProps = {
  message: {
    user: string;
    text: string;
  };
  name: string;
};

export default function Message({
  message: { user, text },
  name,
}: MessageProps) {
  let isSentByCurrentUser = false;
  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }
  return isSentByCurrentUser ? (
    <div className="MessageContainer RightMessage">
      <p className="UserMessage">{user}</p>
      <span className="MessageText RightMessageText">{text}</span>
    </div>
  ) : (
    <div className="MessageContainer LeftMessage">
      <span className="MessageText LeftMessageText">{text}</span>
      <p className="UserMessage">{user}</p>
    </div>
  );
}
