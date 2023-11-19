import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  handleActionVoted,
} from "../../handlers/actions";
import { useClock } from "../../providers/clock-provider";
import { confirm } from "../../util/confirm";
import Clock from "./Clock/Clock";
import Voice from "../Voice/Voice";
import Messages from "./Messages/Messages";
import Roles from "./Roles/Roles";
import Alert from "../Alert/Alert";
import SocketIndicator from "../SocketIndicator/SocketIndicator";
import SkipVote from "./SkipVote/SkipVote";
import Votes from "./Votes/Votes";
import { IoMdArrowRoundBack } from "react-icons/io";

type TableProps = {
  code: string;
  roles: Role[];
  players: User[];
  currentUser: User;
  threeRemainCard: Role[];
  turnCall: string[];
  isEnded: boolean;
};

export default function Table({
  code,
  roles,
  players,
  currentUser,
  threeRemainCard,
  turnCall,
  isEnded,
}: TableProps) {
  let currentUserIndex = players.findIndex(
    (player) => player.name === currentUser.name
  );
  if (currentUserIndex === -1) {
    currentUserIndex = players.length;
  }

  const userBeforeCurrentUser = players.slice(0, currentUserIndex);
  const userAfterCurrentUser = players.slice(
    currentUserIndex + 1,
    players.length
  );
  const userRemain = [...userAfterCurrentUser, ...userBeforeCurrentUser];
  const [leftUsers, topUsers, rightUsers] = splitUser(userRemain);

  const navigate = useNavigate();
  const { socket } = useSocket();
  const [show, setShow] = useState({
    roles: false,
    messages: false,
    votes: false,
  });
  const [currentVoted, setCurrentVoted] = useState(0);
  const playerVotes = useRef<{ [key: string]: number }>({});
  const { turn, done, counter } = useClock();
  const [flipped, setFlipped] = useState(false);
  const userFlipped = useRef<User>();
  const user2Flipped = useRef<User>();
  const indexesFlip = useRef<Set<number>>(new Set<number>());
  const refTroublemaker = useRef<Set<User>>(new Set<User>());
  const refSeer = useRef(0);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const werewolfCanDo =
    players.filter((player) => player.role === Role.Werewolf).length === 1;

  useEffect(() => {
    if (turn === 0) {
      setFlipped(true);
    }
    if (turn !== 0) {
      setFlipped(false);
    }
    if (
      turn !== 0 &&
      turnCall[turn] !== Role.Robber &&
      turnCall[turn] !== Role.Insomniac &&
      turnCall[turn] !== Role.Drunk
    ) {
      setFlipped(false);
    }
    if (
      turnCall[turn] !== Role.Werewolf &&
      currentUser.firstRole === Role.Werewolf
    ) {
      indexesFlip.current.clear();
      userFlipped.current = undefined;
      user2Flipped.current = undefined;
    }
    if (turnCall[turn] !== Role.Mason && currentUser.firstRole === Role.Mason) {
      userFlipped.current = undefined;
      user2Flipped.current = undefined;
    }
    if (
      turnCall[turn] !== Role.Doppelganger &&
      currentUser.firstRole === Role.Doppelganger
    ) {
      userFlipped.current = undefined;
      user2Flipped.current = undefined;
      indexesFlip.current.clear();
    }
    if (
      turnCall[turn] !== Role.Minion &&
      currentUser.firstRole === Role.Minion
    ) {
      userFlipped.current = undefined;
      user2Flipped.current = undefined;
    }
    if (turnCall[turn] !== Role.Seer && currentUser.firstRole === Role.Seer) {
      indexesFlip.current.clear();
      userFlipped.current = undefined;
    }
    if (
      turnCall[turn] === Role.Robber &&
      currentUser.firstRole === Role.Robber &&
      currentUser.action
    ) {
      setFlipped(true);
    }
    if (
      turnCall[turn] === Role.Insomniac &&
      currentUser.firstRole === Role.Insomniac
    ) {
      setFlipped(true);
    }
    if (
      turnCall[turn] === Role.Werewolf &&
      currentUser.firstRole === Role.Werewolf
    ) {
      userFlipped.current = players.find(
        (player) =>
          player.firstRole === Role.Werewolf && player.name !== currentUser.name
      );
      user2Flipped.current = players.find(
        (player) =>
          player.doppelgangerRole === Role.Werewolf &&
          player.name !== currentUser.name
      );
      setFlipped(true);
    }
    if (
      turnCall[turn] === Role.Werewolf &&
      currentUser.firstRole === Role.Doppelganger &&
      currentUser.doppelgangerRole === Role.Werewolf
    ) {
      const werewolfs = players.filter(
        (player) => player.role === Role.Werewolf
      );
      userFlipped.current = werewolfs[0];
      user2Flipped.current = werewolfs[1];
    }
    if (turnCall[turn] === Role.Mason && currentUser.firstRole === Role.Mason) {
      userFlipped.current = players.find(
        (player) =>
          player.firstRole === Role.Mason && player.name !== currentUser.name
      );
      user2Flipped.current = players.find(
        (player) =>
          player.doppelgangerRole === Role.Mason &&
          player.name !== currentUser.name
      );
      setFlipped(true);
    }
    if (
      turnCall[turn] === Role.Mason &&
      currentUser.firstRole === Role.Doppelganger &&
      currentUser.doppelgangerRole === Role.Mason
    ) {
      const masons = players.filter(
        (player) =>
          player.role === Role.Mason && player.name !== currentUser.name
      );
      userFlipped.current = masons[0];
      user2Flipped.current = masons[1];
      setFlipped(true);
    }
    if (
      turnCall[turn] === Role.Minion &&
      currentUser.firstRole === Role.Minion
    ) {
      const werewolfs = players.filter(
        (player) => player.role === Role.Werewolf
      );
      userFlipped.current = werewolfs[0];
      user2Flipped.current = werewolfs[1];
      setFlipped(true);
    }
    if (
      turnCall[turn] === Role.Werewolf &&
      currentUser.firstRole === Role.Doppelganger &&
      currentUser.doppelgangerRole === Role.Minion
    ) {
      const werewolfs = players.filter(
        (player) => player.role === Role.Werewolf
      );
      userFlipped.current = werewolfs[0];
      user2Flipped.current = werewolfs[1];
      setFlipped(true);
    }
  }, [turn, turnCall, players, currentUser, werewolfCanDo]);

  useEffect(() => {
    if (turnCall[turn] === undefined) {
      const currentVoted = players.filter(
        (player) => player.voted === currentUser.name
      ).length;
      setCurrentVoted(currentVoted);
    }
  }, [turnCall, turn, players, currentUser]);

  useEffect(() => {
    const usersVotes: { [key: string]: number } = {};
    if (turnCall[turn] === undefined) {
      const votes = players
        .filter((player) => player.voted !== undefined)
        .map((player) => player.voted);
      for (const player of votes) {
        usersVotes[player] = usersVotes[player] ? usersVotes[player] + 1 : 1;
      }
      playerVotes.current = usersVotes;
    }
  }, [turnCall, turn, players]);

  const handleClick = async (card: any) => {
    if (turnCall[turn] === undefined && typeof card === "object" && !isEnded) {
      if (await confirm(`Bạn xác nhận muốn vote ${card.name} không?`)) {
        handleActionVoted(socket, code, currentUser, card.name);
      }
    }
    if (currentUser.action) {
      return;
    }
    if (
      (currentUser.firstRole === Role.Robber &&
        turn === turnCall.indexOf(Role.Robber)) ||
      currentUser.doppelgangerRole === Role.Robber
    ) {
      if (typeof card === "object") {
        if (
          await confirm(`Bạn xác nhận muốn đổi lá bài với ${card.name} không?`)
        ) {
          handleActionRobber(socket, currentUser, code, card, setFlipped);
        }
      }
    } else if (
      (currentUser.firstRole === Role.Troublemaker &&
        turn === turnCall.indexOf(Role.Troublemaker)) ||
      currentUser.doppelgangerRole === Role.Troublemaker
    ) {
      if (refTroublemaker.current.size < 2 && typeof card === "object") {
        refTroublemaker.current.add(card as User);
        if (refTroublemaker.current.size === 2) {
          if (
            await confirm(
              `Bạn xác nhận muốn đối vị trí lá bài của ${
                Array.from(refTroublemaker.current.values())[0].name
              } với ${card.name} không?`
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
      }
    } else if (
      (currentUser.firstRole === Role.Drunk &&
        turn === turnCall.indexOf(Role.Drunk)) ||
      currentUser.doppelgangerRole === Role.Drunk
    ) {
      if (typeof card === "number") {
        if (await confirm("Bạn xác nhận muốn đổi lá bài này không?")) {
          handleActionDrunk(socket, currentUser, code, card);
        }
      }
    } else if (
      currentUser.firstRole === Role.Werewolf &&
      werewolfCanDo &&
      turn === turnCall.indexOf(Role.Werewolf)
    ) {
      if (typeof card === "number") {
        if (await confirm("Bạn xác nhận muốn xem lá bài này không?")) {
          indexesFlip.current.add(card);
          socket.emit("game:patch:status-action", {
            code: code,
            user: currentUser,
          });
        }
      }
    } else if (
      (currentUser.firstRole === Role.Seer &&
        turn === turnCall.indexOf(Role.Seer)) ||
      currentUser.doppelgangerRole === Role.Seer
    ) {
      if (typeof card === "number") {
        if (await confirm("Bạn xác nhận muốn xem lá bài này không?")) {
          refSeer.current = refSeer.current + 1;
          indexesFlip.current.add(card);
          if (refSeer.current === 2) {
            socket.emit("game:patch:status-action", {
              code: code,
              user: currentUser,
            });
          }
        }
      } else if (typeof card === "object" && card.name !== currentUser.name) {
        if (refSeer.current === 0) {
          if (await confirm("Bạn xác nhận muốn xem lá bài này không?")) {
            userFlipped.current = card;
            socket.emit("game:patch:status-action", {
              code: code,
              user: currentUser,
            });
          }
        }
      }
    } else if (
      currentUser.firstRole === Role.Doppelganger &&
      turn === turnCall.indexOf(Role.Doppelganger)
    ) {
      if (
        typeof card === "object" &&
        card.name !== currentUser.name &&
        currentUser.doppelgangerRole === undefined
      ) {
        if (await confirm("Bạn xác nhận muốn xem lá bài này không?")) {
          userFlipped.current = card;
          socket.emit("game:patch:status-action-doppelganger", {
            code: code,
            user: currentUser,
            role: card.firstRole,
          });
        }
      }
    }
  };

  const handleButtonBackToRoom = () => {
    if (currentUser.master) {
      socket.emit("game:restart", { code });
      socket.emit("room:create", { name: currentUser.name, code });
      navigate(`/room?code=${code}&name=${currentUser.name}`, {
        replace: true,
      });
    } else {
      socket.emit("room:rejoin", { name: currentUser.name, code });
      navigate(`/room?code=${code}&name=${currentUser.name}`, {
        replace: true,
      });
    }
  };

  const handleButtonRoles = () => {
    setShow({
      roles: !show.roles,
      votes: false,
      messages: false,
    });
  };

  const handleButtonVotes = () => {
    setShow({
      roles: false,
      votes: !show.votes,
      messages: false,
    });
  };

  const handleButtonMessages = () => {
    setShow({
      roles: false,
      votes: false,
      messages: !show.messages,
    });
  };

  return (
    <>
      {showAlert && <Alert message={alertMessage} />}
      <Roles
        roles={roles}
        show={show.roles}
        onClickButton={handleButtonRoles}
      />
      <Voice />
      <Messages
        code={code}
        name={currentUser.name}
        show={show.messages}
        onClickButton={handleButtonMessages}
      />
      {turnCall[turn] === undefined && (
        <>
          <SkipVote
            socket={socket}
            code={code}
            currentUser={currentUser}
            isEnded={isEnded}
          />
          <Votes
            players={players}
            show={show.votes}
            onClickButton={handleButtonVotes}
          />
        </>
      )}
      {(isEnded || done) && (
        <>
          <Alert message="Game ended" />
          <button
            className="h-[24px] flex justify-center items-center btn absolute right-0 top-0 mr-2 mt-2"
            onClick={handleButtonBackToRoom}
          >
            <IoMdArrowRoundBack />
          </button>
        </>
      )}
      <SocketIndicator />
      <div className="grid grid-cols-5 grid-rows-3 h-full md:w-1/2 md:mx-auto">
        <div className="col-span-1 col-start-1 row-span-3 row-start-1 my-auto">
          <PlayerCard
            position="table-left"
            users={leftUsers.map((user) => user)}
            onClick={handleClick}
            userFlipped={userFlipped.current}
            user2Flipped={user2Flipped.current}
            done={done || isEnded}
            playerVotes={playerVotes.current}
          />
        </div>
        <div className="col-span-3 m-auto">
          <PlayerCard
            position="table-top"
            users={topUsers.map((user) => user)}
            onClick={handleClick}
            userFlipped={userFlipped.current}
            user2Flipped={user2Flipped.current}
            done={done || isEnded}
            playerVotes={playerVotes.current}
          />
        </div>
        <div className="col-span-1 col-start-5 row-span-3 row-start-1 my-auto">
          <PlayerCard
            position="table-right"
            users={rightUsers.map((user) => user)}
            onClick={handleClick}
            userFlipped={userFlipped.current}
            user2Flipped={user2Flipped.current}
            done={done || isEnded}
            playerVotes={playerVotes.current}
          />
        </div>
        <div className="col-span-3 m-auto">
          <h1 className="w-fit mx-auto my-2 px-2 py-1 text-lg text-white text-center bg-indigo-500 font-semibold border border-solid rounded-lg md:text-2xl">
            {turnCall[turn] ? "Lượt " + turnCall[turn] : "Thảo luận"}
          </h1>
          <ThreeRemainCard
            roles={threeRemainCard}
            onClick={handleClick}
            indexesFlip={Array.from(indexesFlip.current.values())}
            done={done || isEnded}
          />
          <Clock done={done || isEnded} second={counter} />
        </div>
        <div className="col-span-3 mt-[20px] md:mt-[90px]">
          <UserCard
            role={currentUser.role}
            onClick={handleClick}
            flipped={flipped}
            done={done || isEnded}
            voted={currentVoted}
          />
        </div>
      </div>
    </>
  );
}
