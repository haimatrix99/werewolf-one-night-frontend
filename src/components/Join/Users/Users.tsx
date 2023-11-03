import React, { useState } from "react";
import { User } from "../../../lib/types";
import { FaUsers } from "react-icons/fa";

type UsersProps = {
  users: User[];
  isMobile: boolean;
};

export default function Users({ users, isMobile }: UsersProps) {
  const [showUsers, setShowUsers] = useState(false);
  const handleButton = () => {
    setShowUsers(!showUsers);
  };
  return (
    <>
      <button className="btn h-[48px] absolute left-[10px] bottom-[10px] md:hidden" onClick={handleButton}>
        <FaUsers />
      </button>
      {(showUsers || !isMobile) && (
        <div className="center bg-indigo-500 border-2 border-solid border-gray rounded-lg p-2 text-white md:static md:h-fit md:translate-x-0 md:translate-y-0 md:mr-4">
          <p className="font-semibold text-xl border-b-2 border-solid border-white mb-2">
            Danh sách người chơi
          </p>
          <ul className="flex flex-col gap-1">
            {users.map((user, index) => (
              <div
                key={index}
                className="basis-full border-2 border-solid border-white rounded-lg px-2"
              >
                <li>{user.name}</li>
              </div>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
