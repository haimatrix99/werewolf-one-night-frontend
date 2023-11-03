import React, { useState } from "react";
import { Role } from "../../../lib/enums";
import { FaUserSecret } from "react-icons/fa";

type RolesProps = {
  roles: Role[];
};

export default function Roles({ roles }: RolesProps) {
  const [showRoles, setShowRoles] = useState(false);
  const handleButton = () => {
    setShowRoles(!showRoles);
  };
  return (
    <>
      <button
        className="h-[48px] btn absolute right-[130px] bottom-[10px]"
        onClick={handleButton}
      >
        <FaUserSecret />
      </button>
      {showRoles && (
        <div className="z-50 center bg-indigo-500 border-2 border-solid border-white rounded-lg p-2 text-white">
          <p className="font-semibold text-xl border-b-2 border-solid border-white mb-2">
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
