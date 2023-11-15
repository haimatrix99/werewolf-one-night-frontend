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
    <div className="flex justify-center items-center gap-3">
      {roles.map((role, index) => (
        <div
          key={index}
          className="w-fit relative flex flex-col justify-center items-center"
          onClick={() => onClick(index)}
        >
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
              indexesFlip.includes(index) || done ? "card" : "card card-flipped"
            }
            src={require(`../../../assets/roles/${role}.jpg`)}
            alt="Card"
          />
          <p className="w-16 text-center text-sm text-white font-semibold px-2 py-1 border border-solid bg-indigo-500 rounded-lg md:text-lg md:w-24">
            Bài {index + 1}
          </p>
        </div>
      ))}
    </div>
  );
}
