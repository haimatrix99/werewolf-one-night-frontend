import React, { useReducer } from "react";
import MessagesInRoom from "./Messages/Messages";
import { reducer } from "../../handlers/reducer";
import "./Join.css";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";
import { useUserSocket } from "../../hooks/use-user-socket";
import Users from "./Users/Users";
import SelectRoles from "./SelectRoles/SelectRoles";

const initialValue = {
  rolesPool: [],
  numbers: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};

export default function Join() {
  const [{ rolesPool, numbers }, dispatch] = useReducer(reducer, initialValue);
  const navigate = useNavigate();
  const { users } = useUserSocket({ userKey: "users-online" });
  const params = queryString.parse(window.location.search);
  const code = params.code as string;
  const name = params.name as string;
  const roomMaster = users.filter((user) => user.master === true);
  const isRoomMaster = roomMaster[0]?.name === name ? true : false;

  const handleStartGame = () => {
    const canStartGame = users.length + 3 === rolesPool.length;
    if (canStartGame) {
      navigate(`/game?code=${code}&name=${name}`, { replace: true });
    } else {
      alert("Không thể bắt đầu game");
    }
  };

  return (
    <div className="Join">
      {isRoomMaster && <SelectRoles numbers={numbers} dispatch={dispatch} />}
      <div className="JoinCenterContainer">
        <MessagesInRoom name={name} code={code} />
        {isRoomMaster && (
          <button className="StartGameButton" onClick={handleStartGame}>
            Start Game
          </button>
        )}
      </div>
      <Users users={users} />
    </div>
  );
}
