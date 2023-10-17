import React, { useState } from "react";
import "./Table.css";
import ThreeRemainCard from "./Card/ThreeRemainCard";
import UserCard from "./Card/UserCard";
import PlayerCard from "./Card/PlayerCard";
import { User } from "../../lib/types";
import { Role } from "../../lib/enums";
import { splitUser } from "../../handlers/splitUser";
import { BiSolidRightArrowSquare } from "react-icons/bi"
import Roles from "./Roles/Roles";

type TableProps = {
  users: User[];
  currentUser: User;
  threeRemainCard: Role[];
};

const roles = [
  Role.Werewolf,
  Role.Werewolf,
  Role.Villager,
  Role.Villager,
  Role.Insomniac,
  Role.Robber,
  Role.Troublemaker,
  Role.Seer,
];

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

  const [showListRoles, setShowListRoles] = useState(false);

  
  return (
    <div className="Table">
      <button className="ShowTableButton" onClick={() => {setShowListRoles(!showListRoles)}}>
        <BiSolidRightArrowSquare />
      </button>
      {
        showListRoles ? <Roles roles={roles} /> : null
      }
      <div className="Left">
        <PlayerCard position="Left" users={leftUsers.map((user) => user)} hidden={false}/>
      </div>
      <div className="Center">
        <PlayerCard position="Top" users={topUsers.map((user) => user)} hidden={false}/>
        <ThreeRemainCard roles={threeRemainCard} hidden={false}/>
        <UserCard role={currentUser.role} hidden={true}/>
      </div>
      <div className="Right">
        <PlayerCard position="Right" users={rightUsers.map((user) => user)} hidden={false}/>
      </div>
    </div>
  );
}
