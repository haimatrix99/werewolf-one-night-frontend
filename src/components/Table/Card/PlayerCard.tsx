import React from "react";
import { User } from "../../../lib/types";
import "./Card.css";

type PlayerCardProps = {
  position: string;
  users: User[];
  hidden: boolean;
  onClick: (action: any) => void;
  userFlipped?: User;
};

export default function PlayerCard({
  position,
  users,
  hidden,
  onClick,
  userFlipped,
}: PlayerCardProps) {
  return (
    <div className={position}>
      {users.map((user, index) => (
        <div
          key={index}
          onClick={() => onClick(user)}
        >
          <img
            className="CardImageCover PlayerCardImageSize"
            src={require("../../../assets/cover.png")}
            alt="Card"
            title={hidden ? "Card" : user.role}
          />
          <img
            className={
              userFlipped?.name === user.name
                ? "CardImageFlipped CardImage PlayerCardImageSize"
                : "CardImage PlayerCardImageSize"
            }
            src={require(`../../../assets/roles/${user.role}.jpg`)}
            alt="Card"
            title={hidden ? "Card" : user.role}
          />
          <p className="Name PlayerName">{user.name}</p>
        </div>
      ))}
    </div>
  );
}
