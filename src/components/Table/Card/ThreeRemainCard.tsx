import React from "react";
import { Role } from "../../../lib/enums";
import "./Card.css";

type ThreeRemainCardProps = {
  roles: Role[];
  onClick: (action: any) => void;
  indexesFlip: number[];
  done: boolean;
};

export default function ThreeRemainCard({
  roles,
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
          />
          <img
            className={
              indexesFlip.includes(index) || done
                ? "CardImageFlipped CardImage ThreeRemainCardImageSize"
                : "CardImageCoverFlipped CardImage ThreeRemainCardImageSize"
            }
            src={require(`../../../assets/roles/${role}.jpg`)}
            alt="Card"
          />
          <p className="Name ThreeRemainName">Card {index + 1}</p>
        </div>
      ))}
    </div>
  );
}
