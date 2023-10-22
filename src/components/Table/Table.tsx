import React, { useRef, useState } from "react";
import { useSocket } from "../../providers/socket-provider";
import ThreeRemainCard from "./Card/ThreeRemainCard";
import UserCard from "./Card/UserCard";
import PlayerCard from "./Card/PlayerCard";
import MessagesInGame from "./Messages/Messages";
import { User } from "../../lib/types";
import { Role } from "../../lib/enums";
import { splitUser } from "../../handlers/splitUser";
import { BiSolidRightArrowSquare } from "react-icons/bi";
import Roles from "./Roles/Roles";
import Clock from "./Clock/Clock";
import Voice from "../Voice/Voice";
import Sound from "../Sound/Sound";
import "./Table.css";
import {
  handleActionDrunk,
  handleActionRobber,
  handleActionTroublemaker,
} from "../../handlers/actions";
import { useClock } from "../../providers/clock-provider";

type TableProps = {
  code: string;
  roles: Role[];
  users: User[];
  currentUser: User;
  threeRemainCard: Role[];
};

const TURNS = [
  "Check card",
  "Turn Werewolf",
  "Turn Seer",
  "Turn Robber",
  "Turn Troublemaker",
];

export default function Table({
  code,
  roles,
  users,
  currentUser,
  threeRemainCard,
}: TableProps) {
  let currentUserIndex = users.findIndex(
    (user) => user.name === currentUser.name
  );
  if (currentUserIndex === -1) {
    currentUserIndex = users.length;
  }
  const userBeforeCurrentUser = users.slice(0, currentUserIndex);
  const userAfterCurrentUser = users.slice(currentUserIndex + 1, users.length);
  const userRemain = [...userAfterCurrentUser, ...userBeforeCurrentUser];
  const [leftUsers, topUsers, rightUsers] = splitUser(userRemain);

  const { socket } = useSocket();
  const { turn, done, counter } = useClock();

  const [showListRoles, setShowListRoles] = useState(false);
  const ref = useRef(0);
  const setPlayerTroublemaker = new Set<User>();
  const werewolfCanDo =
    roles.filter((role) => role === Role.Werewolf).length === 1;

  const handleClick = (card: any) => {
    if (!currentUser.action) {
      if (currentUser.firstRole === Role.Robber && turn === 3) {
        if (typeof card === "object") {
          alert(`Bạn đã chọn người chơi ${card.name}`);
          if (
            window.confirm(
              "Bạn xác nhận muốn đổi lá bài với người chơi này không?"
            )
          ) {
            handleActionRobber(socket, currentUser, code, card);
          } else {
            return;
          }
        } else {
          alert(`Bạn không thể chọn bài này`);
        }
      } else if (currentUser.firstRole === Role.Troublemaker && turn === 4) {
        if (setPlayerTroublemaker.size < 2 && typeof card === "object") {
          alert(`Bạn đã chọn người chơi ${card.name}`);
          setPlayerTroublemaker.add(card as User);
          if (setPlayerTroublemaker.size === 2) {
            if (
              window.confirm(
                "Bạn xác nhận muốn đối vị trí của 2 người chơi này không?"
              )
            ) {
              handleActionTroublemaker(
                socket,
                currentUser,
                code,
                Array.from(setPlayerTroublemaker.values())
              );
            } else {
              setPlayerTroublemaker.clear();
            }
          }
        } else {
          alert(`Bạn không thể chọn bài này`);
        }
      } else if (currentUser.firstRole === Role.Drunk) {
        if (typeof card === "number") {
          alert(`Bạn đã chọn người chơi Card ${card + 1}`);
          if (window.confirm("Bạn xác nhận muốn đổi lá bài này không?")) {
            handleActionDrunk(socket, currentUser, code, card);
          } else {
            return;
          }
        } else {
          alert(`Bạn không thể chọn bài này`);
        }
      } else if (
        currentUser.firstRole === Role.Werewolf &&
        werewolfCanDo &&
        turn === 1
      ) {
        if (typeof card === "number") {
          if (window.confirm("Bạn xác nhận muốn xem lá bài này không?")) {
            alert(`Chức năng của Card ${card + 1} là ${threeRemainCard[card]}`);
            socket.emit("update-status-action", {
              code: code.toLowerCase(),
              user: currentUser,
            });
          } else {
            return;
          }
        } else {
          alert(`Bạn không thể chọn bài này`);
        }
      } else if (currentUser.firstRole === Role.Seer && turn === 2) {
        if (typeof card === "number") {
          if (window.confirm("Bạn xác nhận muốn xem lá bài này không?")) {
            alert(`Chức năng của Card ${card + 1} là ${threeRemainCard[card]}`);
            ref.current = ref.current + 1;
            if (ref.current === 2) {
              socket.emit("update-status-action", {
                code: code.toLowerCase(),
                user: currentUser,
              });
            }
          } else {
            return;
          }
        } else if (typeof card === "object" && card.name !== currentUser.name) {
          if (ref.current === 0) {
            if (window.confirm("Bạn xác nhận muốn xem lá bài này không?")) {
              alert(`Chức năng của Player ${card.name} là ${card.role}`);
              socket.emit("update-status-action", {
                code: code.toLowerCase(),
                user: currentUser,
              });
            } else {
              return;
            }
          }
        } else {
          alert(`Bạn không thể chọn bài này`);
        }
      } else if (currentUser.firstRole === Role.Insomniac) {
        if (typeof card === "string") {
          alert(`Chức năng của bạn là ${card}`);
          socket.emit("update-status-action", {
            code: code.toLowerCase(),
            user: currentUser,
          });
        } else {
          alert(`Bạn không thể chọn bài này`);
        }
      }
    }
  };

  return (
    <div className="Table">
      <div className="RoomIDInfo">
        <span className="RoomIDInfoText">Room ID: {code}</span>
      </div>
      <Voice />
      <Sound />
      <MessagesInGame name={currentUser.name} />
      <button
        className="ShowTableButton"
        onClick={() => {
          setShowListRoles(!showListRoles);
        }}
      >
        <BiSolidRightArrowSquare />
      </button>
      {showListRoles ? <Roles roles={roles} /> : null}
      <div className="Left">
        <PlayerCard
          position="Left"
          users={leftUsers.map((user) => user)}
          hidden={true}
          onClick={handleClick}
        />
      </div>
      <div className="Center">
        <PlayerCard
          position="Top"
          users={topUsers.map((user) => user)}
          hidden={true}
          onClick={handleClick}
        />
        <div className="Turn">
          <span className="TurnText">{TURNS[turn]}</span>
        </div>
        <ThreeRemainCard
          roles={threeRemainCard}
          hidden={true}
          onClick={handleClick}
        />
        <Clock done={done} second={counter} />
        <UserCard
          role={currentUser?.role}
          hidden={false}
          onClick={handleClick}
        />
      </div>
      <div className="Right">
        <PlayerCard
          position="Right"
          users={rightUsers.map((user) => user)}
          hidden={true}
          onClick={handleClick}
        />
      </div>
    </div>
  );
}
