import React, { useReducer } from "react";
import MessagesInRoom from "./Messages/Messages";
import { Role } from "../../lib/enums";
import { ROLE_CARD } from "../../lib/constants";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { reducer } from "../../handlers/reducer";
import "./Join.css";
import { useNavigate } from "react-router-dom";

const name = "test";
const messages = [
  {
    user: "test",
    text: "Hello",
  },
];

const users: string[] = ["test", "test2", "test3"];

const roles: string[] = Object.values(Role);

const initialValue = {
  numbers: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};

export default function Join() {
  const [state, dispatch] = useReducer(reducer, initialValue);
  const navigate = useNavigate();
  const handleStartGame = () => {
    const numberRoles = state.numbers.reduce(
      (sum, current) => sum + current,
      0
    );
    const canStartGame: boolean = users.length + 3 === numberRoles;
    if (canStartGame) {
      navigate("/game");
    }
  };

  return (
    <div className="Join">
      <div className="SelectRoles">
        <p className="SelectRolesListTitle">Danh sách chức năng</p>
        <ul className="SelectRolesList">
          {roles.map((role, index) => (
            <div key={index} className="SelectRole">
              <div className="SelectRoleInfo SelectRoleName">
                <li>{role}</li>
              </div>
              <div className="NumberCard">{state.numbers[index]}</div>
              <button
                className="SelectRoleButton"
                disabled={
                  state.numbers[index] >= ROLE_CARD[role] ? true : false
                }
                onClick={() => {
                  dispatch({ index: index, type: "plus" });
                }}
              >
                <AiOutlinePlusCircle />
              </button>
              <button
                className="SelectRoleButton"
                disabled={state.numbers[index] <= 0 ? true : false}
                onClick={() => {
                  dispatch({ index: index, type: "minus" });
                }}
              >
                <AiOutlineMinusCircle />
              </button>
            </div>
          ))}
        </ul>
      </div>
      <div className="JoinCenterContainer">
        <MessagesInRoom messages={messages} name={name} />
        <button className="StartGameButton" onClick={handleStartGame}>
          Start Game
        </button>
      </div>
      <div className="Users">
        <p className="ListUsersTitle">Danh sách người chơi</p>
        <ul className="ListUsers">
          {users.map((user, index) => (
            <div key={index} className="Username UsernameText">
              <li>{user}</li>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
