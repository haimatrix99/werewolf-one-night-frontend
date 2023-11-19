import { Role } from "../lib/enums";

export const getTurn = (roles: Role[]) => {
  let totalTurn: number = 1;
  const turnCall: string[] = ["kiểm tra bài"];
  const soundCall: string[] = ["Kiểm tra bài"];
  if (roles.includes(Role.Doppelganger)) {
    totalTurn++;
    turnCall.push(Role.Doppelganger);
    soundCall.push(Role.Doppelganger);
  }
  if (roles.includes(Role.Werewolf)) {
    totalTurn++;
    turnCall.push(Role.Werewolf);
    soundCall.push(Role.Werewolf);
  }
  if (roles.includes(Role.Minion)) {
    totalTurn++;
    turnCall.push(Role.Minion);
    soundCall.push(Role.Minion);
  }
  if (roles.includes(Role.Mason)) {
    totalTurn++;
    turnCall.push(Role.Mason);
  }
  if (roles.includes(Role.Seer)) {
    totalTurn++;
    turnCall.push(Role.Seer);
    soundCall.push(Role.Seer);
  }
  if (roles.includes(Role.Robber)) {
    totalTurn++;
    turnCall.push(Role.Robber);
    soundCall.push(Role.Robber);
  }
  if (roles.includes(Role.Troublemaker)) {
    totalTurn++;
    turnCall.push(Role.Troublemaker);
    soundCall.push(Role.Troublemaker);
  }
  if (roles.includes(Role.Drunk)) {
    totalTurn++;
    turnCall.push(Role.Drunk);
    soundCall.push(Role.Drunk);
  }
  if (roles.includes(Role.Insomniac)) {
    totalTurn++;
    turnCall.push(Role.Insomniac);
    soundCall.push(Role.Insomniac);
  }

  return {
    totalTurn,
    turnCall,
    soundCall,
  };
};
