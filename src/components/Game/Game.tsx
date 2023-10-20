import React from "react";
import Table from "../Table/Table";
import { Role } from "../../lib/enums";
import "./Game.css";
import { pickRandomItems } from "../../handlers/pickRandomItems";
import queryString from "query-string";
import { useGameSocket } from "../../hooks/use-game-socket";

export default function Game() {
  const params = queryString.parse(window.location.search);
  const code = params.code as string;
  const name = params.name as string;

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

  // useGameSocket({gameKey: "game"})

  return (
    <div className="Game">
      {/* <Table
        code={code}
        roles={rolesPool}
        users={users}
        currentUser={}
        threeRemainCard={threeRemainCard}
      /> */}
    </div>
  );
}
