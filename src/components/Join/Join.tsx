import React from "react";
import MessagesInRoom from "./Messages/Messages";
import "./Join.css";

const name = "test";
const messages = [
  {
    user: "test",
    text: "Hello 1",
  },
];

export default function Join() {
  return (
    <div className="Join">
      <div className="SelectRoles"></div>
      <MessagesInRoom messages={messages} name={name} />
      <div className="ListUsers">Users</div>
    </div>
  );
}
