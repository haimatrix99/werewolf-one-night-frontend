import React from "react";
import Table from "../Table/Table";
import { Role } from "../../lib/enums";
import { User } from "../../lib/types";
import { pickRandomItems } from "../../handlers/pickRandomItems";
import "./Game.css";
import Roles from "../Roles/Roles";

const rolesPool: Role[] = [
  Role.Werewolf,
  Role.Werewolf,
  Role.Villager,
  Role.Villager,
  Role.Insomniac,
  Role.Robber,
  Role.Troublemaker,
  Role.Seer,
];

export default function Game() {
  const [threeRemainCard, rolesPlayerPool] = pickRandomItems(rolesPool, 3);

  const users: User[] = rolesPlayerPool.map((role, index) => {
    return {
      name: `Player ${index + 1}`,
      role,
    };
  });

  return (
    <div className="Game">
      <Roles/>
      <Table
        users={users}
        currentUser={users[3]}
        threeRemainCard={threeRemainCard}
      />
    </div>
  );
}
