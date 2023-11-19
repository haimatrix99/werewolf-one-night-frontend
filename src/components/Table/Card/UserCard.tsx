import React from "react";
import { Role } from "../../../lib/enums";

type UserCardProps = {
  role: Role;
  onClick: (action: any) => void;
  flipped?: boolean;
  done: boolean;
  voted: number;
};

export default function UserCard({
  role,
  onClick,
  flipped,
  done,
  voted,
}: UserCardProps) {
  return (
    <div
      className="relative flex flex-col justify-center items-center"
      onClick={() => onClick(role)}
    >
      <img
        className={
          !(flipped || done)
            ? "card-cover md:mb-0"
            : "card-cover card-cover-flipped md:mb-0"
        }
        src={require("../../../assets/cover.png")}
        alt="Card"
      />
      <img
        className={
          flipped || done ? "card md:mb-0" : "card card-flipped md:mb-0"
        }
        src={require(`../../../assets/roles/${role}.jpg`)}
        alt="Card"
      />
      {voted !== 0 && (
        <p className="center text-center text-lg text-white font-semibold">
          {voted > 1 ? voted + " votes" : voted + " vote"}
        </p>
      )}
    </div>
  );
}
