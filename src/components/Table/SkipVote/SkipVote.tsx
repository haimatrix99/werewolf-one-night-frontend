import React from "react";
import { FaTimesCircle } from "react-icons/fa";
import { User } from "../../../lib/types";
import { handleActionVoted } from "../../../handlers/actions";
import { confirm } from "../../../util/confirm";

type SkipVoteProps = {
  socket: any;
  code: string;
  currentUser: User;
  isEnded: boolean;
};

export default function SkipVote({
  socket,
  code,
  currentUser,
  isEnded,
}: SkipVoteProps) {
  const handleButton = async () => {
    if (await confirm(`Bạn xác nhận muốn vote không có sói trong bàn không?`)) {
      handleActionVoted(socket, code, currentUser, "");
    }
  };
  return !isEnded ? (
    <button
      className="h-[48px] btn absolute right-[250px] bottom-[10px]"
      onClick={handleButton}
    >
      <FaTimesCircle />
    </button>
  ) : (
    <></>
  );
}
