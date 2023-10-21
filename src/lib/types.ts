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

export type User =  {
  id: string;
  name: string;
  code: string;
  master: boolean;
  role: Role;
  firstRole: Role;
  error?: string;
  action?: boolean;
}

export type MessageInfo = {
  user: string;
  text: string;
};