import React, { useEffect, useRef, useState } from "react";
import { useSocket } from "../../providers/socket-provider";
import ThreeRemainCard from "./Card/ThreeRemainCard";
import UserCard from "./Card/UserCard";
import PlayerCard from "./Card/PlayerCard";
import { User } from "../../lib/types";
import { Role } from "../../lib/enums";
import { splitUser } from "../../handlers/splitUser";
import {
  handleActionDrunk,
  handleActionRobber,
  handleActionTroublemaker,
} from "../../handlers/actions";
import { useClock } from "../../providers/clock-provider";
import { confirm } from "../../util/confirm";
import Clock from "./Clock/Clock";
import Voice from "../Voice/Voice";
import Messages from "./Messages/Messages";
import Roles from "./Roles/Roles";
import Alert from "../Alert/Alert";

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
  const [flipped, setFlipped] = useState(false);
  const useFlipped = useRef<User>();
  const indexesFlip = useRef<Set<number>>(new Set<number>());
  const refTroublemaker = useRef<Set<User>>(new Set<User>());
  const refSeer = useRef(0);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const werewolfCanDo =
    users.filter((user) => user.role === Role.Werewolf).length === 1;

  useEffect(() => {
    if (
      turn !== 0 &&
      turnCall[turn] !== "Robber" &&
      turnCall[turn] !== "Insomniac" &&
      turnCall[turn] !== "Drunk"
    ) {
      setFlipped(false);
    }
    if (
      turnCall[turn] !== "Werewolf" &&
      currentUser.firstRole === Role.Werewolf
    ) {
      indexesFlip.current.clear();
      useFlipped.current = undefined;
    }
    if (turnCall[turn] !== "Seer" && currentUser.firstRole === Role.Seer) {
      indexesFlip.current.clear();
      useFlipped.current = undefined;
    }
    if (
      turnCall[turn] === "Robber" &&
      currentUser.firstRole === Role.Robber &&
      currentUser.action
    ) {
      setFlipped(true);
    }
    if (
      turnCall[turn] === "Insomniac" &&
      currentUser.firstRole === Role.Insomniac &&
      currentUser.action
    ) {
      setFlipped(true);
    }
    if (
      currentUser.firstRole === Role.Werewolf &&
      turnCall[turn] === "Werewolf" &&
      !werewolfCanDo
    ) {
      useFlipped.current = users.filter(
        (user) => user.role === Role.Werewolf && user.name !== currentUser.name
      )[0];
    }
  }, [turn, turnCall, users, currentUser, werewolfCanDo]);

  const handleClick = async (card: any) => {
    if (turn === 0) {
      if (typeof card === "string") {
        setFlipped(true);
      }
    }
    if (!currentUser.action) {
      if (
        currentUser.firstRole === Role.Robber &&
        turn === turnCall.indexOf(Role.Robber)
      ) {
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
        if (refTroublemaker.current.size < 2 && typeof card === "object") {
          refTroublemaker.current.add(card as User);
          if (refTroublemaker.current.size === 2) {
            if (
              await confirm(
                `Bạn xác nhận muốn đối vị trí lá bài của 2 người này không?`
              )
            ) {
              handleActionTroublemaker(
                socket,
                currentUser,
                code,
                Array.from(refTroublemaker.current.values())
              );
            } else {
              refTroublemaker.current.clear();
            }
          } else {
            setShowAlert(true);
            setTimeout(() => {
              setShowAlert(false);
            }, 3000);
            setAlertMessage(`Bạn đã chọn ${card.name}`);
          }
        } else {
        }
      } else if (
        currentUser.firstRole === Role.Drunk &&
        turn === turnCall.indexOf(Role.Drunk)
      ) {
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
            indexesFlip.current.add(card);
            socket.emit("update-status-action", {
              code: code,
              user: currentUser,
            });
          } else {
            return;
          }
        } else {
          return;
        }
      } else if (
        currentUser.firstRole === Role.Seer &&
        turn === turnCall.indexOf(Role.Seer)
      ) {
        if (typeof card === "number") {
          if (await confirm("Bạn xác nhận muốn xem lá bài này không?")) {
            refSeer.current = refSeer.current + 1;
            indexesFlip.current.add(card);
            if (refSeer.current === 2) {
              socket.emit("update-status-action", {
                code: code,
                user: currentUser,
              });
            }
          } else {
          }
        } else if (typeof card === "object" && card.name !== currentUser.name) {
          if (refSeer.current === 0) {
            if (await confirm("Bạn xác nhận muốn xem lá bài này không?")) {
              useFlipped.current = card;
              socket.emit("update-status-action", {
                code: code,
                user: currentUser,
              });
            } else {
              return;
            }
          }
        } else {
        }
      }
    }
  };
  return (
    <>
      {showAlert && <Alert message={alertMessage} />}
      <Roles roles={roles} />
      <Voice />
      <Messages code={code} name={currentUser.name} />
      <div className="grid grid-cols-5 grid-rows-3 h-full md:w-1/2 md:mx-auto">
        <div className="col-span-1 col-start-1 row-span-3 row-start-1 my-auto">
          <PlayerCard
            position="table-left"
            users={leftUsers.map((user) => user)}
            onClick={handleClick}
            userFlipped={useFlipped.current}
            done={done}
          />
        </div>
        <div className="col-span-3 m-auto">
          <PlayerCard
            position="table-top"
            users={topUsers.map((user) => user)}
            onClick={handleClick}
            userFlipped={useFlipped.current}
            done={done}
          />
        </div>
        <div className="col-span-1 col-start-5 row-span-3 row-start-1 my-auto">
          <PlayerCard
            position="table-right"
            users={rightUsers.map((user) => user)}
            onClick={handleClick}
            userFlipped={useFlipped.current}
            done={done}
          />
        </div>
        <div className="col-span-3 m-auto">
          <h1 className="w-fit mx-auto my-2 px-2 py-1 text-lg text-white text-center bg-indigo-500 font-semibold border border-solid rounded-lg md:text-2xl">
            {turnCall[turn] ? "Turn " + turnCall[turn] : "Thảo luận"}
          </h1>
          <ThreeRemainCard
            roles={threeRemainCard}
            onClick={handleClick}
            indexesFlip={Array.from(indexesFlip.current.values())}
            done={done}
          />
          <Clock done={done} second={counter} />
        </div>
        <div className="col-span-3 mt-[20px] md:mt-[90px]">
          <UserCard
            role={currentUser?.role}
            onClick={handleClick}
            flipped={flipped}
            done={done}
          />
        </div>
      </div>
    </>
  );
}
