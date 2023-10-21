import React from "react";
import { User } from "../../../lib/types";
import "./Card.css";

type PlayerCardProps = {
  position: string;
  users: User[];
  hidden: boolean;
  onClick: (action: any) => void;
};

export default function PlayerCard({
  position,
  users,
  hidden,
  onClick,
}: PlayerCardProps) {
  return (
    <div className={position}>
      {users.map((user, index) => (
        <div key={index} onClick={() => onClick(user)}>
          <img
            className="CardImage PlayerCardImageSize"
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
