import React from "react";
import { Role } from "../../lib/enums";
import "./Card.css";

type ThreeRemainCardProps = {
  roles: Role[];
};

export default function ThreeRemainCard({ roles }: ThreeRemainCardProps) {
  return (
    <div className="ThreeRemainCard">
      {roles.map((role, index) => (
        <div>
          <img
            className="ThreeRemainCardImage"
            src={require(`../../assets/roles/${role}.jpg`)}
            alt={role}
          />
          <p className="ThreeRemainCardName">Card {index + 1}</p>
        </div>
      ))}
    </div>
  );
}
