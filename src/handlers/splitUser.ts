import { User } from "../lib/types";

const splitUser = (userRemain: User[]): [User[], User[], User[]] => {
  const numberUserRemain = userRemain.length;
  let numberTopUsers =
    numberUserRemain > 7 ? 3 : Math.ceil(numberUserRemain / 3);
  let numberLeftUsers = Math.ceil((numberUserRemain - numberTopUsers) / 2);
  if (numberLeftUsers > 3) {
    numberLeftUsers = Math.ceil((numberUserRemain - 3) / 2);
  }

  const leftUsers = userRemain.slice(0, numberLeftUsers);
  const topUsers = userRemain.slice(
    numberLeftUsers,
    numberTopUsers + numberLeftUsers
  );
  const rightUsers = userRemain.slice(
    numberTopUsers + numberLeftUsers,
    numberUserRemain
  );

  return [leftUsers, topUsers, rightUsers];
};

export {
    splitUser
}
