import { Role } from "../lib/enums";

export const pickRandomItems = (
  arr: Role[],
  n: number
): { threeRemainCard: Role[]; rolesPlayerPool: Role[] } => {
  const shuffled = Array.from(arr).sort(() => 0.5 - Math.random());
  const threeRemainCard = shuffled.slice(0, n);
  const rolesPlayerPool = shuffled.slice(n, arr.length);
  if (!rolesPlayerPool.includes(Role.Werewolf)) {
    return pickRandomItems(arr, n);
  }
  return {
    threeRemainCard,
    rolesPlayerPool,
  };
};
