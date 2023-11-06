import { Role } from "../lib/enums";

export const getTurn = (roles: Role[]) => {
  let totalTurn: number = 1;
  const turnCall: string[] = ["check card"];
  if (roles.includes(Role.Werewolf)) {
    totalTurn++;
    turnCall.push("Werewolf");
  }
  if (roles.includes(Role.Seer)) {
    totalTurn++;
    turnCall.push("Seer");
  }
  if (roles.includes(Role.Robber)) {
    totalTurn++;
    turnCall.push("Robber");
  }
  if (roles.includes(Role.Troublemaker)) {
    totalTurn++;
    turnCall.push("Troublemaker");
  }
  if (roles.includes(Role.Drunk)) {
    totalTurn++;
    turnCall.push("Drunk");
  }
  if (roles.includes(Role.Insomniac)) {
    totalTurn++;
    turnCall.push("Insomniac");
  }

  return {
    totalTurn,
    turnCall,
  };
};
