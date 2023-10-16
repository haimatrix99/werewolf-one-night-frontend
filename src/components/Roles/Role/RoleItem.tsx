import React from "react";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import "./RoleItem.css";

type RoleProps = {
  index: number;
  role: string;
};

export default function RoleItem({ index, role }: RoleProps) {
  return (
    <div className="Role">
      <div className="RoleName">
        <li key={index}>{role}</li>
      </div>
      <div className="Number">0</div>
      <div className="btn">
        <div className="iconBtn">
          <AiOutlinePlusCircle />
        </div>
        <div className="iconBtn">
          <AiOutlineMinusCircle />
        </div>
      </div>
    </div>
  );
}
