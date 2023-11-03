import React from "react";
import { Role } from "../../../lib/enums";

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
  done,
}: ThreeRemainCardProps) {
  return (
    <div className="flex justify-center items-center">
      {roles.map((role, index) => (
        <div key={index} className="relative flex flex-col justify-center items-center" onClick={() => onClick(index)}>
          <img
            className={
              !(indexesFlip.includes(index) || done)
                ? "card-cover"
                : "card-cover card-cover-flipped"
            }
            src={require("../../../assets/cover.png")}
            alt="Card"
          />
          <img
            className={
              indexesFlip.includes(index) || done
                ? "card"
                : "card card-flipped"
            }
            src={require(`../../../assets/roles/${role}.jpg`)}
            alt="Card"
          />
          <p className="text-sm text-white font-semibold px-3 py-1 border border-solid bg-indigo-500 rounded-lg">Card {index + 1}</p>
        </div>
      ))}
    </div>
  );
}
