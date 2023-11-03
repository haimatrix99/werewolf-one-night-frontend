import React from "react";
import { User } from "../../../lib/types";

type PlayerCardProps = {
  position: string;
  users: User[];
  onClick: (action: any) => void;
  userFlipped?: User;
  done: boolean;
};

export default function PlayerCard({
  position,
  users,
  onClick,
  userFlipped,
  done,
}: PlayerCardProps) {
  return (
    <div className={position}>
      {users.map((user, index) => (
        <div key={index} className="relative flex flex-col justify-center items-center" onClick={() => onClick(user)}>
          <img
            className={
              !(userFlipped?.name === user.name || done)
                ? "card-cover"
                : "card-cover card-cover-flipped"
            }
            src={require("../../../assets/cover.png")}
            alt="Card"
          />
          <img
            className={
              userFlipped?.name === user.name || done
                ? "card"
                : "card card-flipped"
            }
            src={require(`../../../assets/roles/${user.role}.jpg`)}
            alt="Card"
          />
          <p className="text-sm text-white  text-center font-semibold px-4 py-1 border border-solid rounded-lg bg-indigo-500">{user.name}</p>
        </div>
      ))}
    </div>
  );
}
