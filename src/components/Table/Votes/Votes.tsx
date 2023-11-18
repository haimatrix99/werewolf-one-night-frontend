import React from "react";
import { MdWhereToVote } from "react-icons/md";
import { User } from "../../../lib/types";

type VotesProps = {
  players: User[];
  show: boolean;
  onClickButton: () => void;
};

export default function Roles({ players, show, onClickButton }: VotesProps) {
  return (
    <>
      <button
        className="h-[48px] btn absolute right-[190px] bottom-[10px]"
        onClick={onClickButton}
      >
        <MdWhereToVote />
      </button>
      {show && (
        <div className="z-10 w-[80%] center bg-indigo-500 border-2 border-solid border-white rounded-lg p-2 text-white md:w-fit">
          <p className="font-semibold text-center text-xl border-b-2 border-solid border-white mb-2">
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
                        : " đã vote không sói"
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
