import React, { useState } from "react";
import "./Table.css";
import ThreeRemainCard from "./Card/ThreeRemainCard";
import UserCard from "./Card/UserCard";
import PlayerCard from "./Card/PlayerCard";
import { User } from "../../lib/types";
import { Role } from "../../lib/enums";
import { splitUser } from "../../handlers/splitUser";
import { BiSolidRightArrowSquare } from "react-icons/bi";
import Roles from "./Roles/Roles";
import Clock from "./Clock/Clock";
import Voice from "../Voice/Voice";
import Messages from "./Messages/Messages";
import Sound from "../Sound/Sound";

type TableProps = {
  code: string;
  roles: Role[];
  users: User[];
  currentUser: User;
  threeRemainCard: Role[];
};

const name = "test";
const messages = [
  {
    user: "test",
    text: "Hello 1",
  },
];

export default function Table({
  code,
  roles,
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

  const [showListRoles, setShowListRoles] = useState(false);

  return (
    <div className="Table">
      <div className="RoomIDInfo">
        <span className="RoomIDInfoText">Room ID: {code}</span>
      </div>
      <Voice />
      <Sound />
      <Messages messages={messages} name={name} />
      <button
        className="ShowTableButton"
        onClick={() => {
          setShowListRoles(!showListRoles);
        }}
      >
        <BiSolidRightArrowSquare />
      </button>
      {showListRoles ? <Roles roles={roles} /> : null}
      <div className="Left">
        <PlayerCard
          position="Left"
          users={leftUsers.map((user) => user)}
          hidden={false}
        />
      </div>
      <div className="Center">
        <PlayerCard
          position="Top"
          users={topUsers.map((user) => user)}
          hidden={false}
        />
        <ThreeRemainCard roles={threeRemainCard} hidden={false} />
        <Clock counter={0} />

        <UserCard role={currentUser.role} hidden={true} />
      </div>
      <div className="Right">
        <PlayerCard
          position="Right"
          users={rightUsers.map((user) => user)}
          hidden={false}
        />
      </div>
    </div>
  );
}
