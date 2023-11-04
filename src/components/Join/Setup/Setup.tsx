import React, { useState } from "react";
import { ROLE_CARD } from "../../../lib/constants";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { FaUserSecret } from "react-icons/fa";
import { Role } from "../../../lib/enums";
import { Action } from "../../../lib/types";

const roles: string[] = Object.values(Role);

type SetupProps = {
  numbers: number[];
  dispatch: React.Dispatch<Action>;
  isRoomMaster: boolean;
  isMobile: boolean;
};

export default function Setup({
  numbers,
  dispatch,
  isRoomMaster,
  isMobile,
}: SetupProps) {
  const [showRoles, setShowRoles] = useState(false);

  const handleButton = () => {
    setShowRoles(!showRoles);
  };

  return (
    <>
      <button className="btn h-[48px] absolute left-[70px] bottom-[10px] md:hidden" onClick={handleButton}>
        <FaUserSecret />
      </button>
      {(showRoles || !isMobile) && (
        <div className="center bg-indigo-500 border-2 border-solid border-white rounded-lg p-2 text-white md:static md:h-fit md:translate-x-0 md:translate-y-0 md:ml-4">
          <p className="font-semibold text-xl border-b-2 border-solid border-white mb-2">
            Danh sách chức năng
          </p>
          <ul className="flex flex-col gap-1">
            {roles.map((role, index) => (
              <div key={index} className="flex gap-1">
                <div className="basis-full border-2 border-solid border-white rounded-lg px-2">
                  <li>{role}</li>
                </div>
                {isRoomMaster && (
                  <>
                    <div className="min-w-[32px] border-2 border-solid border-white rounded-lg px-2 text-center">
                      {numbers[index]}
                    </div>
                    <button
                      className="hover:scale-105"
                      disabled={
                        numbers[index] >= ROLE_CARD[role] ? true : false
                      }
                      onClick={() => {
                        dispatch({ roles: roles, index: index, type: "plus" });
                      }}
                    >
                      <AiOutlinePlusCircle />
                    </button>
                    <button
                      className="hover:scale-105"
                      disabled={numbers[index] <= 0 ? true : false}
                      onClick={() => {
                        dispatch({ roles: roles, index: index, type: "minus" });
                      }}
                    >
                      <AiOutlineMinusCircle />
                    </button>
                  </>
                )}
              </div>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
