import React from "react";
import "./Message.css";

type MessageProps = {
  message: {
    user: string;
    text: string;
  };
  name: string;
};

export default function MessageInGame({
  message: { user, text },
  name,
}: MessageProps) {
  let isSentByCurrentUser = false;
  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }
  return isSentByCurrentUser ? (
    <div className="MessageInGameContainer RightMessageInGame">
      <p className="UserMessageInGame">{user}</p>
      <span className="MessageInGameText RightMessageInGameText">{text}</span>
    </div>
  ) : (
    <div className="MessageInGameContainer LeftMessageInGame">
      <span className="MessageInGameText LeftMessageInGameText">{text}</span>
      <p className="UserMessageInGame">{user}</p>
    </div>
  );
}
