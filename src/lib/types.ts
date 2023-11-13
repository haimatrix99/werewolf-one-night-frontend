import { Role } from "./enums";

export type Action = {
  roles: string[]
  index: number;
  type: "plus" | "minus";
};

export type State = {
  rolesPool: Role[];
  numbers: number[];
};

export type Game = {
  code: string;
  rolesPlayer: User[];
  threeRemainCard: Role[];
  discussTime: number;
  isVoted?: boolean;
  isEnded?: boolean;
};

export type User = {
  id: string;
  name: string;
  code: string;
  master: boolean;
  role: Role;
  numberVoted?: number;
  voted?: string;
  firstRole?: Role;
  action?: boolean;
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