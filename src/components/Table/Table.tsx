import React, { useEffect, useRef, useState } from "react";
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
import { confirm } from "../../util/confirm";

type TableProps = {
  code: string;
  roles: Role[];
  users: User[];
  currentUser: User;
  threeRemainCard: Role[];
  turnCall: string[];
};

export default function Table({
  code,
  roles,
  users,
  currentUser,
  threeRemainCard,
  turnCall,
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

  const [flipped, setFlipped] = useState(false);
  const [useFlipped, setUserFlipped] = useState<User>();
  const indexesFlip = useRef(new Set<number>());

  const setPlayerTroublemaker = new Set<User>();
  const werewolfCanDo =
    roles.filter((role) => role === Role.Werewolf).length === 1;

  useEffect(() => {
    if (turn !== 0) {
      setFlipped(false);
      indexesFlip.current = new Set<number>();
      setUserFlipped(undefined);
    }
  }, [turn]);

  const handleClick = async (card: any) => {
    if (turn === 0) {
      if (typeof card === "string") {
        setFlipped(true);
      }
    }
    if (!currentUser.action) {
      if (currentUser.firstRole === Role.Robber && turn === turnCall.indexOf(Role.Robber)) {
        if (typeof card === "object") {
          if (
            await confirm(
              `Bạn xác nhận muốn đổi lá bài với ${card.name} không?`
            )
          ) {
            setFlipped(true);
            handleActionRobber(socket, currentUser, code, card);
          } else {
            return;
          }
        } else {
        }
      } else if (
        currentUser.firstRole === Role.Troublemaker &&
        turn === turnCall.indexOf(Role.Troublemaker)
      ) {
        if (setPlayerTroublemaker.size < 2 && typeof card === "object") {
          setPlayerTroublemaker.add(card as User);
          if (setPlayerTroublemaker.size === 2) {
            if (
              await confirm(
                "Bạn xác nhận muốn đối vị trí lá bài của 2 người chơi này không?"
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
        }
      } else if (currentUser.firstRole === Role.Drunk && turn === turnCall.indexOf(Role.Drunk)) {
        if (typeof card === "number") {
          if (await confirm("Bạn xác nhận muốn đổi lá bài này không?")) {
            handleActionDrunk(socket, currentUser, code, card);
          } else {
            return;
          }
        } else {
        }
      } else if (
        currentUser.firstRole === Role.Werewolf &&
        werewolfCanDo &&
        turn === turnCall.indexOf(Role.Werewolf)
      ) {
        if (typeof card === "number") {
          if (await confirm("Bạn xác nhận muốn xem lá bài này không?")) {
            socket.emit("update-status-action", {
              code: code.toLowerCase(),
              user: currentUser,
            });
            indexesFlip.current.add(card);
          } else {
            return;
          }
        } else {
        }
      } else if (currentUser.firstRole === Role.Seer && turn === turnCall.indexOf(Role.Seer)) {
        if (typeof card === "number") {
          if (await confirm("Bạn xác nhận muốn xem lá bài này không?")) {
            ref.current = ref.current + 1;
            if (ref.current === 2) {
              socket.emit("update-status-action", {
                code: code.toLowerCase(),
                user: currentUser,
              });
            }
            indexesFlip.current.add(card);
          } else {
          }
        } else if (typeof card === "object" && card.name !== currentUser.name) {
          if (ref.current === 0) {
            if (await confirm("Bạn xác nhận muốn xem lá bài này không?")) {
              socket.emit("update-status-action", {
                code: code.toLowerCase(),
                user: currentUser,
              });
              setUserFlipped(card);
            } else {
              return;
            }
          }
        } else {
        }
      } else if (
        currentUser.firstRole === Role.Insomniac &&
        turn === turnCall.indexOf(Role.Insomniac)
      ) {
        if (typeof card === "string") {
          socket.emit("update-status-action", {
            code: code.toLowerCase(),
            user: currentUser,
          });
          setFlipped(true);
        } else {
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
          userFlipped={useFlipped}
          done={done}
        />
      </div>
      <div className="Center">
        <PlayerCard
          position="Top"
          users={topUsers.map((user) => user)}
          hidden={true}
          onClick={handleClick}
          userFlipped={useFlipped}
          done={done}
        />
        <div className="Turn">
          <span className="TurnText">
            {turnCall[turn] ? "Turn " + turnCall[turn] : "Thảo luận"}
          </span>
        </div>
        <ThreeRemainCard
          roles={threeRemainCard}
          hidden={true}
          onClick={handleClick}
          indexesFlip={Array.from(indexesFlip.current.values())}
          done={done}
        />
        <Clock done={done} second={counter} />
        <UserCard
          role={currentUser?.role}
          hidden={false}
          onClick={handleClick}
          flipped={flipped}
          done={done}
        />
      </div>
      <div className="Right">
        <PlayerCard
          position="Right"
          users={rightUsers.map((user) => user)}
          hidden={true}
          onClick={handleClick}
          userFlipped={useFlipped}
          done={done}
        />
      </div>
    </div>
  );
}
