import React from "react";
import "./Message.css";

type MessageProps = {
  message: {
    user: string;
    text: string;
  };
  name: string;
};

export default function MessageInRoom({
  message: { user, text },
  name,
}: MessageProps) {
  let isSentByCurrentUser = false;
  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }
  return isSentByCurrentUser ? (
    <div className="MessageInRoomContainer RightMessageInRoom">
      <p className="UserMessageInRoom">{user}</p>
      <span className="MessageInRoomText RightMessageInRoomText">{text}</span>
    </div>
  ) : (
    <div className="MessageInRoomContainer LeftMessageInRoom">
      <span className="MessageInRoomText LeftMessageInRoomText">{text}</span>
      <p className="UserMessageInRoom">{user}</p>
    </div>
  );
}
