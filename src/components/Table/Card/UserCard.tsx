import React from "react";
import { Role } from "../../../lib/enums";
import "./Card.css";

type UserCardProps = {
  role: Role;
  hidden: boolean
};

export default function UserCard({ role, hidden }: UserCardProps) {
  return (
    <div>
      <img
        className="CardImage PlayerCardImageSize"
        src={require(`../../../assets/roles/${role}.jpg`)}
        alt="Card"
        title={hidden ? "Card" : role}
      />
    </div>
  );
}
