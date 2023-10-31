import React from "react";
import { User } from "../../../lib/types";
import { BiMicrophone, BiSolidMicrophone } from "react-icons/bi";
import "./Card.css";
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
        <div key={index} onClick={() => onClick(user)}>
          <img
            className="CardImageCover PlayerCardImageSize"
            src={require("../../../assets/cover.png")}
            alt="Card"
          />
          <img
            className={
              userFlipped?.name === user.name || done
                ? "CardImageFlipped CardImage PlayerCardImageSize"
                : "CardImageCoverFlipped CardImage PlayerCardImageSize"
            }
            src={require(`../../../assets/roles/${user.role}.jpg`)}
            alt="Card"
          />
          <p className="Name PlayerName">
            {user.name}
            <span className="MicroIcon">
              {participants.filter(
                (participant) => participant.identity === user.name
              )[0]?.isSpeaking ? (
                <BiSolidMicrophone />
              ) : (
                <BiMicrophone />
              )}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
}
