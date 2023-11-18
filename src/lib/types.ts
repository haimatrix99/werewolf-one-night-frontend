import { Role } from "./enums";

export type Action = {
  roles: string[];
  index: number;
  type: "plus" | "minus";
};

export type State = {
  rolesPool: Role[];
  numbers: number[];
};

export type Game = {
  players: User[];
  threeRemainCard: Role[];
  discussTime: string;
  isEnded: boolean;
};

export type User = {
  id: string;
  name: string;
  code: string;
  master: boolean;
  firstRole: Role;
  role: Role;
  doppelgangerRole: Role;
  voted: string;
  action: boolean;
};

export type MessageInfo = {
  user: string;
  text: string;
};

export type ConnectionDetails = {
  token: string;
  ws_url: string;
};

export type ConnectionDetailsBody = {
  code: string;
  name: string;
};
