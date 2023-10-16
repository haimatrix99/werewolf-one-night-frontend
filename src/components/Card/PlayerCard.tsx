import React from "react";
import { User } from "../../lib/types";
import "./Card.css";

type PlayerCardProps = {
  position: string;
  users: User[];
};

export default function PlayerCard({ position, users }: PlayerCardProps) {
  return (
    <div className={position}>
      {users.map((user) => (
        <div>
          <img
            className="CardImage"
            src={require(`../../assets/roles/${user.role}.jpg`)}
            alt={user.role}
          />
          <p className="Name">{user.name}</p>
        </div>
      ))}
    </div>
  );
}
