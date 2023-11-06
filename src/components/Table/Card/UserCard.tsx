import React from "react";
import { Role } from "../../../lib/enums";

type UserCardProps = {
  role: Role;
  onClick: (action: any) => void;
  flipped?: boolean;
  done: boolean;
};

export default function UserCard({
  role,
  onClick,
  flipped,
  done,
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
    </div>
  );
}
