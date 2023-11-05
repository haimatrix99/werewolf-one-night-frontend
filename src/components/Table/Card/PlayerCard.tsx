import React from "react";
import { User } from "../../../lib/types";
import { BiMicrophone, BiSolidMicrophone } from "react-icons/bi";
import { useParticipants } from "@livekit/components-react";

type PlayerCardProps = {
  position: string;
  users: User[];
  onClick: (action: any) => void;
  userFlipped?: User;
  done: boolean;
};

export default function PlayerCard({
  position,
  users,
  onClick,
  userFlipped,
  done,
}: PlayerCardProps) {
  const participants = useParticipants();

  return (
    <div className={position}>
      {users.map((user, index) => (
        <div
          key={index}
          className="relative flex flex-col justify-center items-center"
          onClick={() => onClick(user)}
        >
          <img
            className={
              !(userFlipped?.name === user.name || done)
                ? "card-cover"
                : "card-cover card-cover-flipped"
            }
            src={require("../../../assets/cover.png")}
            alt="Card"
          />
          <img
            className={
              userFlipped?.name === user.name || done
                ? "card"
                : "card card-flipped"
            }
            src={require(`../../../assets/roles/${user.role}.jpg`)}
            alt="Card"
          />
          <div className="flex justify-center items-center gap-2 flex-col md:flex-row">
            <p className="text-sm text-white text-center font-semibold px-2 py-1 border border-solid rounded-lg bg-indigo-500 md:text-lg">
              {user.name}
            </p>
            {participants.filter(
              (participant) => participant.identity === user.name
            )[0]?.isSpeaking ? (
              <BiSolidMicrophone className="text-indigo-500 text-xl border border-solid rounded-lg"/>
            ) : (
              <BiMicrophone className="text-indigo-500 text-xl border border-solid rounded-lg"/>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
