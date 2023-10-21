import React from "react";
import { Role } from "../../../lib/enums";
import "./Card.css";

type UserCardProps = {
  role: Role;
  hidden: boolean
  onClick: (action: any) => void;
};

export default function UserCard({ role, hidden, onClick }: UserCardProps) {
  return (
    <div onClick={() => onClick(role)}>
      <img
        className="CardImage PlayerCardImageSize"
        src={require(`../../../assets/roles/${role}.jpg`)}
        alt="Card"
        title={hidden ? "Card" : role}
      />
    </div>
  );
}
