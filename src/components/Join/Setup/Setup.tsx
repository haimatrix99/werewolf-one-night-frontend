import React, { useEffect, useState } from "react";
import { ROLE_CARD } from "../../../lib/constants";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { FaUserSecret } from "react-icons/fa";
import { Role } from "../../../lib/enums";
import { Action } from "../../../lib/types";
import { useSocket } from "../../../providers/socket-provider";

const roles: string[] = Object.values(Role);

type SetupProps = {
  code: string;
  name: string;
  numbers: number[];
  dispatch: React.Dispatch<Action>;
  discussTime: string;
  onDiscussTimeChange: React.Dispatch<React.SetStateAction<string>>;
  isRoomMaster: boolean;
  isMobile: boolean;
  userNumbers: number[];
  userDiscussTime: string;
};

const discussTimeOptions: string[] = ["5", "10", "15", "30"];

export default function Setup({
  code,
  name,
  numbers,
  dispatch,
  discussTime,
  onDiscussTimeChange,
  isRoomMaster,
  isMobile,
  userNumbers,
  userDiscussTime,
}: SetupProps) {
  const [showRoles, setShowRoles] = useState(false);
  const { socket } = useSocket();

  const handleButton = () => {
    setShowRoles(!showRoles);
  };

  const handleButtonPlus = (index: number) => {
    dispatch({
      roles: roles,
      index: index,
      type: "plus",
    });
  };

  const handleButtonMinus = (index: number) => {
    dispatch({
      roles: roles,
      index: index,
      type: "minus",
    });
  };

  useEffect(() => {
    if (isRoomMaster) {
      socket.emit("game:patch:setup", { code, name, numbers, discussTime });
    }
  }, [socket, code, name, isRoomMaster, numbers, discussTime]);

  return (
    <>
      <button
        className="btn h-[48px] absolute left-[70px] bottom-[10px] md:hidden"
        onClick={handleButton}
      >
        <FaUserSecret />
      </button>
      {(showRoles || !isMobile) && (
        <div className="center bg-indigo-500 border-2 border-solid border-white rounded-lg p-2 text-white md:static md:h-fit md:translate-x-0 md:translate-y-0 md:ml-4 md:order-1">
          <p className="font-semibold text-xl border-b-2 border-solid border-white mb-2">
            Danh sách chức năng
          </p>
          <ul className="flex flex-col gap-1">
            {roles.map((role, index) => (
              <div key={index} className="flex gap-1">
                <div className="text-lg basis-full border-2 border-solid border-white rounded-lg px-2 md:text-xl">
                  <li>{role}</li>
                </div>
                {isRoomMaster ? (
                  <>
                    <div className="min-w-[32px] border-2 border-solid border-white rounded-lg px-2 text-center">
                      {numbers[index]}
                    </div>
                    <button
                      className="hover:scale-105 disabled:opacity-20"
                      disabled={
                        numbers[index] >= ROLE_CARD[role] ? true : false
                      }
                      onClick={() => handleButtonPlus(index)}
                    >
                      <AiOutlinePlusCircle />
                    </button>
                    <button
                      className="hover:scale-105 disabled:opacity-20"
                      disabled={numbers[index] <= 0 ? true : false}
                      onClick={() => handleButtonMinus(index)}
                    >
                      <AiOutlineMinusCircle />
                    </button>
                  </>
                ) : (
                  <>
                    <div className="min-w-[32px] border-2 border-solid border-white rounded-lg px-2 text-center">
                      {userNumbers[index]}
                    </div>
                  </>
                )}
              </div>
            ))}
          </ul>
          <div className="flex justify-center items-center mt-4 gap-2 ">
            <label htmlFor="discussTime" className="text-lg w-fit md:text-xl">
              Thời gian thảo luận
            </label>
            {isRoomMaster ? (
              <select
                name="discussTime"
                defaultValue={discussTime}
                className="text-lg bg-indigo-500 border-2 border-solid border-white rounded-lg px-2 py-1 md:text-xl"
                onChange={(e) => onDiscussTimeChange(e.currentTarget.value)}
              >
                {discussTimeOptions.map((discussTime) => (
                  <option key={discussTime} value={discussTime}>
                    {discussTime} phút
                  </option>
                ))}
              </select>
            ) : (
              <div className="text-lg bg-indigo-500 border-2 border-solid border-white rounded-lg px-2 py-1 md:text-xl">
                {userDiscussTime} phút
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
