import React from "react";
import "./Game.css";
import queryString from "query-string";
import Table from "../Table/Table";
import { useRoleGameSocket } from "../../hooks/use-role-game-socket";
import { shuffle } from "../../handlers/shuffleArray";
import { ClockProvider } from "../../providers/clock-provider";
import { Role } from "../../lib/enums";

export default function Game() {
  const params = queryString.parse(window.location.search);
  const code = params.code as string;
  const name = params.name as string;
  let totalTurn: number = 1;
  const turnCall: string[] = ["Check card"];

  const { rolesPlayer, threeRemainCard } = useRoleGameSocket({
    roleKey: "game-info",
    code: code.toLowerCase(),
  });

  const roles = shuffle([
    ...threeRemainCard,
    ...rolesPlayer.map((user) => user.role),
  ]);

  if (roles.includes(Role.Werewolf)) {
    totalTurn++;
    turnCall.push("Turn Werewolf");
  }
  if (roles.includes(Role.Seer)) {
    totalTurn++;
    turnCall.push("Turn Seer");
  }
  if (roles.includes(Role.Robber)) {
    totalTurn++;
    turnCall.push("Turn Robber");
  }
  if (roles.includes(Role.Troublemaker)) {
    totalTurn++;
    turnCall.push("Turn Troublemaker");
  }
  if (roles.includes(Role.Drunk)) {
    totalTurn++;
    turnCall.push("Turn Drunk");
  }
  if (roles.includes(Role.Insomniac)) {
    totalTurn++;
    turnCall.push("Turn Insomniac");
  }

  return (
    <ClockProvider totalTurn={totalTurn}>
      <div className="Game">
        {rolesPlayer.length > 0 && (
          <Table
            code={code}
            roles={roles}
            users={rolesPlayer}
            currentUser={rolesPlayer.filter((user) => user.name === name)[0]}
            threeRemainCard={threeRemainCard}
            turnCall={turnCall}
          />
        )}
      </div>
    </ClockProvider>
  );
}
