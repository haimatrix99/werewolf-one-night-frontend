import React from "react";
import { ROLE_CARD } from "../../../lib/constants";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { Role } from "../../../lib/enums";
import { Action } from "../../../lib/types";
import "./SelectRoles.css"

const roles: string[] = Object.values(Role);

type SelectRolesProps = {
  numbers: number[];
  dispatch: React.Dispatch<Action>;
};

export default function SelectRoles({ numbers, dispatch }: SelectRolesProps) {
  return (
    <div className="SelectRoles">
      <p className="SelectRolesListTitle">Danh sách chức năng</p>
      <ul className="SelectRolesList">
        {roles.map((role, index) => (
          <div key={index} className="SelectRole">
            <div className="SelectRoleInfo SelectRoleName">
              <li>{role}</li>
            </div>
            <div className="NumberCard">{numbers[index]}</div>
            <button
              className="SelectRoleButton"
              disabled={numbers[index] >= ROLE_CARD[role] ? true : false}
              onClick={() => {
                dispatch({ roles: roles, index: index, type: "plus" });
              }}
            >
              <AiOutlinePlusCircle />
            </button>
            <button
              className="SelectRoleButton"
              disabled={numbers[index] <= 0 ? true : false}
              onClick={() => {
                dispatch({ roles: roles, index: index, type: "minus" });
              }}
            >
              <AiOutlineMinusCircle />
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}
