import { Role } from "./enums";

export type RoleCard = {
  Doppelganger: 1;
  Drunk: 1;
  Hunter: 1;
  Insomniac: 1;
  Mason: 2;
  Minion: 1;
  Robber: 1;
  Seer: 1;
  Tanner: 1;
  Troublemaker: 1;
  Villager: 3;
  Werewolf: 2;
};

export type Action = {
  roles: string[]
  index: number;
  type: "plus" | "minus";
};

export type State = {
  rolesPool: string[];
  numbers: number[];
};

export type User =  {
  id: string;
  name: string;
  code: string;
  master: boolean;
  role: Role;
  error?: string;
}

export type MessageInfo = {
  user: string;
  text: string;
};