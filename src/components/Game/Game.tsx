import React from "react";
import "./Game.css";
import queryString from "query-string";
import Table from "../Table/Table";
import { useRoleGameSocket } from "../../hooks/use-role-game-socket";
import { shuffle } from "../../handlers/shuffleArray";

export default function Game() {
  const params = queryString.parse(window.location.search);
  const code = params.code as string;
  const name = params.name as string;

  const { rolesPlayer, threeRemainCard } = useRoleGameSocket({
    roleKey: "game-info",
    code: code.toLowerCase(),
  });


  const roles = shuffle([...threeRemainCard, ...rolesPlayer.map((user) => user.role)])

  return (
    <div className="Game">
      {rolesPlayer.length > 0 && (
        <Table
          code={code}
          roles={roles}
          users={rolesPlayer}
          currentUser={rolesPlayer.filter((user) => user.name === name)[0]}
          threeRemainCard={threeRemainCard}
        />
      )}
    </div>
  );
}
