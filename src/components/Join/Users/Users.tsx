import React from "react";
import { User } from "../../../lib/types";
import "./Users.css"

type UsersProps = {
  users: User[];
};

export default function Users({ users }: UsersProps) {
  return (
    <div className="Users">
      <p className="ListUsersTitle">Danh sách người chơi</p>
      <ul className="ListUsers">
        {users.map((user, index) => (
          <div key={index} className="Username UsernameText">
            <li>{user.name}</li>
          </div>
        ))}
      </ul>
    </div>
  );
}
