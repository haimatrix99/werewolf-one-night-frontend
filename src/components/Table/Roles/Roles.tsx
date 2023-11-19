import React from "react";
import { FaUserSecret } from "react-icons/fa";
import { Role } from "../../../lib/enums";

type RolesProps = {
  roles: Role[];
  show: boolean;
  onClickButton: () => void;
};

const rolePriority: { [key: string]: number } = {
  "Kẻ mạo danh": 1,
  "Ma sói": 2,
  "Kẻ phản bội": 3,
  "Thợ hồ": 4,
  "Tiên tri": 5,
  "Đạo tặc": 6,
  "Kẻ gây rối": 7,
  "Bợm nhậu": 8,
  "Cú đêm": 9,
  "Dân làng": Number.MAX_VALUE,
  "Thợ săn": Number.MAX_VALUE,
  "Kẻ chán đời": Number.MAX_VALUE,
};

export default function Roles({ roles, show, onClickButton }: RolesProps) {
  const roleSortByTurn = roles.sort((a, b) => {
    if (rolePriority[a] < rolePriority[b]) return -1;
    if (rolePriority[a] > rolePriority[b]) return 1;
    return 0;
  });
  return (
    <>
      <button
        className="h-[48px] btn absolute right-[130px] bottom-[10px]"
        onClick={onClickButton}
      >
        <FaUserSecret />
      </button>
      {show && (
        <div className="z-10 w-[80%] center bg-indigo-500 border-2 border-solid border-white rounded-lg p-2 text-white md:w-fit">
          <p className="font-semibold text-center text-xl border-b-2 border-solid border-white mb-2">
            Danh sách chức năng
          </p>
          <ul className="flex flex-col gap-1">
            {roleSortByTurn.map((role, index) => (
              <div className="flex gap-1" key={index}>
                <div className="basis-full border-2 border-solid border-white rounded-lg px-2">
                  <li>{role}</li>
                </div>
              </div>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
