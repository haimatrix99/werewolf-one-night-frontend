import React from "react";
import { Role } from "../../../lib/enums";
import { FaUserSecret } from "react-icons/fa";

type RolesProps = {
  roles: Role[];
  show: boolean;
  onClickButton: () => void;
};

export default function Roles({ roles, show, onClickButton }: RolesProps) {
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
            {roles.map((role, index) => (
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
