import React from "react";
import { User } from "../../../lib/types";
import { FaUsers } from "react-icons/fa";
import { useParticipants } from "@livekit/components-react";
import { BiMicrophone, BiSolidMicrophone } from "react-icons/bi";

type UsersProps = {
  users: User[];
  isMobile: boolean;
  show: boolean;
  onClickButton: () => void;
};

export default function Users({
  users,
  isMobile,
  show,
  onClickButton,
}: UsersProps) {
  const participants = useParticipants();

  return (
    <>
      <button
        className="btn h-[48px] absolute left-[10px] bottom-[10px] md:hidden"
        onClick={onClickButton}
      >
        <FaUsers />
      </button>
      {(show || !isMobile) && (
        <div className="z-10 w-[70%] center bg-indigo-500 border-2 border-solid border-gray rounded-lg p-2 text-white md:static md:h-fit md:translate-x-0 md:translate-y-0 md:mr-4 md:order-3 md:w-fit">
          <p className="font-semibold text-center text-xl border-b-2 border-solid border-white mb-2">
            Danh sách người chơi
          </p>
          <ul className="flex flex-col gap-1">
            {users.map((user, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-2 border-solid border-white rounded-lg px-2"
              >
                <li>{user.name}</li>
                {participants.filter(
                  (participant) => participant.identity === user.name
                )[0]?.isSpeaking ? (
                  <BiSolidMicrophone />
                ) : (
                  <BiMicrophone />
                )}
              </div>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
