import { Role } from "./enums";

export type User = {
  name: string;
  role: Role;
};

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
  type: "plus" | "minus";
  role: string;
};

export type NumberCards = {
  [key: string]: number
}
