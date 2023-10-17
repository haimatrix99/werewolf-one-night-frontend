import React from "react";
import { User } from "../../../lib/types";
import "./Card.css";

type PlayerCardProps = {
  position: string;
  users: User[];
  hidden: boolean;
};

export default function PlayerCard({ position, users, hidden }: PlayerCardProps) {
  return (
    <div className={position}>
      {users.map((user) => (
        <div>
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
