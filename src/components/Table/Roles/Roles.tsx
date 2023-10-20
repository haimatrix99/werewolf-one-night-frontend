import React from "react";
import "./Roles.css";
import { Role } from "../../../lib/enums";

type RolesProps = {
  roles: Role[]
}

export default function Roles({ roles }: RolesProps) {
  return (
    <div className="Roles">
      <ul className="RolesList">
        {roles.map((role, index) => (
          <div className="Role">
            <div className="RoleInfo RoleName">
              <li key={index}>{role}</li>
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}
