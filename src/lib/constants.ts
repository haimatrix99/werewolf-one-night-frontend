const MIN_PLAYERS = 3;
const MAX_PLAYERS = 10;

const ROLE_CARD: { [key: string]: number }  = {
  // "Doppelganger": 1,
  "Drunk": 1,
  // "Hunter": 1,
  "Insomniac": 1,
  // "Mason": 2,
  // "Minion": 1,
  "Robber": 1,
  "Seer": 1,
  // "Tanner": 1,
  "Troublemaker": 1,
  "Villager": 3,
  "Werewolf": 2,
};

export { MIN_PLAYERS, MAX_PLAYERS, ROLE_CARD };