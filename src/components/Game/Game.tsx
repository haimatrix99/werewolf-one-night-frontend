import React from "react";
import Table from "../Table/Table";
import { Role } from "../../lib/enums";
import { User } from "../../lib/types";
import { pickRandomItems } from "../../handlers/pickRandomItems";
import "./Game.css";

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

const [threeRemainCard, rolesPlayerPool] = pickRandomItems(rolesPool, 3);

const users: User[] = rolesPlayerPool.map((role, index) => {
  return {
    name: `Player ${index + 1}`,
    role,
  };
});

export default function Game() {
  return (
    <div className="Game">
      <div className="bg-image"></div>
      <Table
        users={users}
        currentUser={users[3]}
        threeRemainCard={threeRemainCard}
      />
    </div>
  );
}
