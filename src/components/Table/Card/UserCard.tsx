import React from "react";
import { Role } from "../../../lib/enums";
import "./Card.css";

type UserCardProps = {
  role: Role;
  hidden: boolean;
  onClick: (action: any) => void;
  flipped?: boolean;
};

export default function UserCard({
  role,
  hidden,
  onClick,
  flipped = false,
}: UserCardProps) {
  return (
    <div onClick={() => onClick(role)}>
      <img
        className="CardImageCover PlayerCardImageSize"
        src={require("../../../assets/cover.png")}
        alt="Card"
        title={hidden ? "Card" : role}
      />
      <img
        className={
          flipped
            ? "CardImageFlipped CardImage PlayerCardImageSize"
            : "CardImage PlayerCardImageSize"
        }
        src={require(`../../../assets/roles/${role}.jpg`)}
        alt="Card"
        title={hidden ? "Card" : role}
      />
    </div>
  );
}
