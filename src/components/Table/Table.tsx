import React from "react";
import "./Table.css";
import ThreeRemainCard from "../Card/ThreeRemainCard";
import UserCard from "../Card/UserCard";
import PlayerCard from "../Card/PlayerCard";
import { User } from "../../lib/types";
import { Role } from "../../lib/enums";
import { splitUser } from "../../handlers/splitUser";

type TableProps = {
  users: User[];
  currentUser: User;
  threeRemainCard: Role[];
};

export default function Table({
  users,
  currentUser,
  threeRemainCard,
}: TableProps) {
  let currentUserIndex = users.findIndex(
    (user) => user.name === currentUser.name
  );
  if (currentUserIndex === -1) {
    currentUserIndex = users.length;
  }
  const userBeforeCurrentUser = users.slice(0, currentUserIndex);
  const userAfterCurrentUser = users.slice(currentUserIndex + 1, users.length);
  const userRemain = [...userAfterCurrentUser, ...userBeforeCurrentUser];
  const [leftUsers, topUsers, rightUsers] = splitUser(userRemain);
  return (
    <div className="Table">
      <div className="Left">
        <PlayerCard position="Left" users={leftUsers.map((user) => user)} />
      </div>
      <div className="Center">
        <PlayerCard position="Top" users={topUsers.map((user) => user)} />
        <ThreeRemainCard roles={threeRemainCard} />
        <UserCard role={currentUser.role} />
      </div>
      <div className="Right">
        <PlayerCard position="Right" users={rightUsers.map((user) => user)} />
      </div>
    </div>
  );
}
