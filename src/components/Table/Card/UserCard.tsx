import React from "react";
import { Role } from "../../../lib/enums";
import "./Card.css";

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
    <div onClick={() => onClick(role)}>
      <img
        className="CardImageCover PlayerCardImageSize"
        src={require("../../../assets/cover.png")}
        alt="Card"
      />
      <img
        className={
          flipped || done
          ? "CardImageFlipped CardImage PlayerCardImageSize"
          : "CardImageCoverFlipped CardImage PlayerCardImageSize"
        }
        src={require(`../../../assets/roles/${role}.jpg`)}
        alt="Card"
      />
    </div>
  );
}
