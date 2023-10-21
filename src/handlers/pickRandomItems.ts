import { Role } from "../lib/enums";
import { shuffle } from "./shuffleArray";

export const pickRandomItems = (
  arr: Role[],
  n: number
): { threeRemainCard: Role[]; rolesPlayerPool: Role[] } => {
  const shuffled = shuffle(arr);
  const threeRemainCard = shuffled.slice(0, n);
  const rolesPlayerPool = shuffled.slice(n, arr.length);
  return {
    threeRemainCard,
    rolesPlayerPool,
  };
};
