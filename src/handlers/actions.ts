import { Role } from "../lib/enums";
import { User } from "../lib/types";

export const handleActionRobber = (
  socket: any,
  currentUser: User,
  code: string,
  player: User | undefined
) => {
  if (
    currentUser.firstRole === Role.Robber &&
    player !== undefined &&
    player !== currentUser
  ) {
    socket.emit("update-role-player", {
      code,
      player1: currentUser,
      player2: player,
      currentUser,
    });
  }
};

export const handleActionTroublemaker = (
  socket: any,
  currentUser: User,
  code: string,
  players: User[]
) => {
  if (
    currentUser.firstRole === Role.Troublemaker &&
    players.length === 2 &&
    players[0] !== currentUser &&
    players[1] !== currentUser
  ) {
    socket.emit("update-role-player", {
      code,
      player1: players[0],
      player2: players[1],
      currentUser,
    });
  }
};

export const handleActionDrunk = (
  socket: any,
  currentUser: User,
  code: string,
  index: number
) => {
  if (currentUser.firstRole === Role.Drunk && index !== -1) {
    socket.emit("update-role-card", {
      code,
      player: currentUser,
      index,
    });
  }
};

export const handleActionVoted = (
  socket: any,
  code: string,
  currentUser: User,
  name: string
) => {
  socket.emit("update-status-voted", {
    code,
    currentUser,
    name,
  });
};
