import React from "react";
import Table from "../Table/Table";
import { Role } from "../../lib/enums";
import { User } from "../../lib/types";
import "./Game.css";
import { pickRandomItems } from "../../handlers/pickRandomItems";
import queryString from "query-string";

export default function Game() {
  const params = queryString.parse(window.location.search);
  const code = params.code as string;

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

  return (
    <div className="Game">
      <Table
        code={code}
        roles={rolesPool}
        users={users}
        currentUser={users[3]}
        threeRemainCard={threeRemainCard}
      />
    </div>
  );
}
