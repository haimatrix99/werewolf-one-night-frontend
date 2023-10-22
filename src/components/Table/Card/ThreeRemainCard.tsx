import React from "react";
import { Role } from "../../../lib/enums";
import "./Card.css";

type ThreeRemainCardProps = {
  roles: Role[];
  hidden: boolean;
  onClick: (action: any) => void;
  indexesFlip: number[];
  done: boolean;
};

export default function ThreeRemainCard({
  roles,
  hidden,
  onClick,
  indexesFlip,
  done
}: ThreeRemainCardProps) {
  return (
    <div className="ThreeRemainCard">
      {roles.map((role, index) => (
        <div
          key={index}
          onClick={() => onClick(index)}
        >
          <img
            className="CardImageCover ThreeRemainCardImageSize"
            src={require("../../../assets/cover.png")}
            alt="Card"
            title={hidden ? "Card" : role}
          />
          <img
            className={
              indexesFlip.includes(index) || done
                ? "CardImageFlipped CardImage ThreeRemainCardImageSize"
                : "CardImage ThreeRemainCardImageSize"
            }
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
