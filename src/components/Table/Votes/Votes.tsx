import React, { useState } from "react";
import { MdWhereToVote } from "react-icons/md";
import { User } from "../../../lib/types";

type VotesProps = {
  players: User[];
};

export default function Roles({ players }: VotesProps) {
  const [showVotes, setShowVotes] = useState(false);
  const handleButton = () => {
    setShowVotes(!showVotes);
  };

  return (
    <>
      <button
        className="h-[48px] btn absolute right-[190px] bottom-[10px]"
        onClick={handleButton}
      >
        <MdWhereToVote />
      </button>
      {showVotes && (
        <div className="z-50 center bg-indigo-500 border-2 border-solid border-white rounded-lg p-2 text-white">
          <p className="font-semibold text-xl border-b-2 border-solid border-white mb-2">
            Danh sách Votes
          </p>
          <ul className="flex flex-col gap-1">
            {players.map((player, index) => (
              <div className="flex gap-1" key={index}>
                <div className="basis-full border-2 border-solid border-white rounded-lg px-2">
                  <li>
                    {player.name}
                    {player.voted !== undefined
                      ? player.voted
                        ? " đã vote " + player.voted
                        : " đã skip vote"
                      : " chưa vote"}
                  </li>
                </div>
              </div>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
