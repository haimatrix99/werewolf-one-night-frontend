import React from "react";
import "./Users.css"
import { useParticipants } from "@livekit/components-react";

export default function Users() {
  const participants = useParticipants();
  return (
    <div className="Users">
      <p className="ListUsersTitle">Danh sách người chơi</p>
      <ul className="ListUsers">
        {participants.map((participant, index) => (
          <div key={index} className="Username UsernameText">
            <li>{participant.identity} - { participant.isSpeaking ? "speaking" : "" }</li>
          </div>
        ))}
      </ul>
    </div>
  );
}
