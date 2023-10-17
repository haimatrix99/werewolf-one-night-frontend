import React from "react";
import { Role } from "../../../lib/enums";
import "./Card.css";

type ThreeRemainCardProps = {
  roles: Role[];
  hidden: boolean;
};

export default function ThreeRemainCard({ roles, hidden }: ThreeRemainCardProps) {
  return (
    <div className="ThreeRemainCard">
      {roles.map((role, index) => (
        <div>
          <img
            className="CardImage ThreeRemainCardImageSize"
            src={require(`../../../assets/roles/${role}.jpg`)}
            alt="Card"
            title={hidden ? "Card" : role}
          />
          <p className="Name ThreeRemainName">Card {index + 1}</p>
        </div>
      ))}
    </div>
  );
}
