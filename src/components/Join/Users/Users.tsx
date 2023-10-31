import React from "react";
import "./Users.css";
import { useParticipants } from "@livekit/components-react";
import { User } from "../../../lib/types";
import { BiMicrophone, BiSolidMicrophone } from "react-icons/bi";

type UsersProps = {
  users: User[];
};

export default function Users({ users }: UsersProps) {
  const participants = useParticipants();
  return (
    <div className="Users">
      <p className="ListUsersTitle">Danh sách người chơi</p>
      <ul className="ListUsers">
        {users.map((user, index) => (
          <div key={index} className="Username UsernameText">
            <li>{user.name}</li>
            {
              participants.filter((participant) => (participant.identity === user.name))[0]?.isSpeaking ? <BiSolidMicrophone /> : <BiMicrophone />
            }
          </div>
        ))}
      </ul>
    </div>
  );
}
