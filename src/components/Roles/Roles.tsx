import React from "react";
import RoleItem from "./Role/RoleItem";
import { Role } from "../../lib/enums";
import "./Roles.css"

const roles = Object.keys(Role);

export default function Roles() {
  return (
    <div className="RolesTable">
      <ul className="Roles">
        {roles.map((role, index) => (
          <RoleItem index={index} role={role}/>
        ))}
      </ul>
    </div>
  );
}
