import React from "react";
import { Role } from "../../lib/enums";
import "./Card.css";

type UserCardProps = {
  role: Role;
};

export default function UserCard({ role }: UserCardProps) {
  return (
    <div className="User">
      <img
        className="CardImage"
        src={require(`../../assets/roles/${role}.jpg`)}
        alt={role}
      />
    </div>
  );
}
