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
      <img className={
          !(flipped || done)
          ? "card-cover"
          : "card-cover card-cover-flipped"
        } src={require("../../../assets/cover.png")} alt="Card" />
      <img
        className={
          flipped || done
          ? "card"
          : "card card-flipped"
        }
        src={require(`../../../assets/roles/${role}.jpg`)}
        alt="Card"
      />
    </div>
  );
}
