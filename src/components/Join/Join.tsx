import React, { useEffect, useReducer, useState } from "react";
import Messages from "./Messages/Messages";
import { reducer } from "../../handlers/reducer";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";
import { useUserSocket } from "../../hooks/use-user-socket";
import Users from "./Users/Users";
import Setup from "./Setup/Setup";
import { MAX_PLAYERS, MIN_PLAYERS } from "../../lib/constants";
import { pickRandomItems } from "../../handlers/pickRandomItems";
import { useGameSocket } from "../../hooks/use-game-socket";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { User } from "../../lib/types";
import { Role } from "../../lib/enums";
import { useStartGameSocket } from "../../hooks/use-start-game-socket";
import { AudioConference, LiveKitRoom } from "@livekit/components-react";
import { WebAudioContext } from "../../providers/audio-provider";
import Voice from "../Voice/Voice";
import { useMediaQuery } from "react-responsive";
import { useVoiceConnection } from "../../hooks/use-voice-connection";
import SocketIndicator from "../SocketIndicator/SocketIndicator";
import { useGameSetupSocket } from "../../hooks/use-game-setup";
import { useSocket } from "../../providers/socket-provider";
import { IoMdArrowRoundBack } from "react-icons/io";
import toast from "react-hot-toast";

export default function Join() {
  const params = queryString.parse(window.location.search);
  const code = params.code as string;
  const name = params.name as string;
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
  const { audioContext, connectionDetails } = useVoiceConnection(code, name);

  const [{ rolesPool, numbers }, dispatch] = useReducer(reducer, {
    rolesPool: [],
    numbers: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  });

  const { socket, isConnected } = useSocket();
  const { users } = useUserSocket({ userKey: "room:users" });
  const [show, setShow] = useState({
    users: false,
    setup: false,
  });
  const roomMaster = users.find((user) => user.master === true);
  const isRoomMaster = roomMaster?.name === name ? true : false;
  const [discussTime, setDiscussTime] = useState("10");
  const { userDiscussTime, userNumbers } = useGameSetupSocket("game:get:setup");
  const [players, setPlayers] = useState<User[]>([]);
  const [threeRemainCard, setThreeRemainCard] = useState<Role[]>([]);
  const [signal, setSignal] = useState(false);

  const handleStartGame = () => {
    const canStartGame =
      users.length + 3 === rolesPool.length &&
      users.length >= MIN_PLAYERS &&
      users.length <= MAX_PLAYERS;
    if (canStartGame) {
      const { threeRemainCard, rolesPlayerPool } = pickRandomItems(
        rolesPool,
        3
      );
      const rolesPlayer = users.map((user, index) => {
        return {
          ...user,
          role: rolesPlayerPool[index],
          firstRole: rolesPlayerPool[index],
        };
      });
      setPlayers(rolesPlayer);
      setThreeRemainCard(threeRemainCard);
      setSignal(true);
    } else {
      toast.error(
        "Không thể bắt đầu game khi không đủ số lượng người chơi hoặc thẻ bài"
      );
    }
  };
  useStartGameSocket({
    gameKey: "game:initial",
    signal,
    code,
    name,
    players,
    threeRemainCard,
    discussTime,
  });
  const { startGame } = useGameSocket({ gameKey: "game:start" });

  useEffect(() => {
    if (startGame) {
      navigate(`/game?code=${code}&name=${name}`, { replace: true });
    }
  }, [startGame, code, name, navigate, isConnected]);

  const handleButtonUsers = () => {
    setShow({
      users: !show.users,
      setup: false,
    });
  };

  const handleButtonSetup = () => {
    setShow({
      setup: !show.setup,
      users: false,
    });
  };

  const handleButtonBackToRoom = () => {
    socket.emit("room:leave", { code, name });
    navigate("/", { replace: true });
  };

  if (!audioContext || connectionDetails === null || users.length === 0) {
    return (
      <div className="h-screen flex flex-col flex-1 justify-center items-center">
        <AiOutlineLoading3Quarters className="text-3xl animation-spin" />
        <h1 className="text-3xl">Loading</h1>
      </div>
    );
  }

  return (
    <div className="h-screen w-full">
      <SocketIndicator />
      <button
        className="h-[24px] flex justify-center items-center btn absolute right-0 top-0 mr-2 mt-2"
        onClick={handleButtonBackToRoom}
      >
        <IoMdArrowRoundBack />
      </button>
      <h1 className="py-2 text-center font-semibold text-3xl text-slate-500">
        Werewolf One Night
      </h1>
      <LiveKitRoom
        token={connectionDetails.token}
        serverUrl={connectionDetails.ws_url}
        connect={true}
        audio={true}
        video={false}
        connectOptions={{ autoSubscribe: true }}
        options={{ expWebAudioMix: { audioContext } }}
        className="h-[90%] w-full flex flex-col items-center"
      >
        <WebAudioContext.Provider value={audioContext}>
          <AudioConference className="hidden" />
          <div className="w-full h-full md:flex md:justify-center md:items-center gap-6">
            <div className="w-full h-[90%] flex flex-col justify-center items-center md:order-2 md:w-[60%]">
              <Messages name={name} code={code} />
              {isRoomMaster && (
                <button
                  className="btn mt-3 text-xl text-white font-semibold"
                  onClick={handleStartGame}
                >
                  Bắt đầu trò chơi
                </button>
              )}
            </div>
            <Setup
              code={code}
              name={name}
              numbers={numbers}
              dispatch={dispatch}
              discussTime={discussTime}
              onDiscussTimeChange={setDiscussTime}
              isRoomMaster={isRoomMaster}
              isMobile={isMobile}
              userDiscussTime={userDiscussTime}
              userNumbers={userNumbers}
              show={show.setup}
              onClickButton={handleButtonSetup}
            />
            <Users
              users={users.sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
              })}
              isMobile={isMobile}
              show={show.users}
              onClickButton={handleButtonUsers}
            />
            <Voice />
          </div>
        </WebAudioContext.Provider>
      </LiveKitRoom>
    </div>
  );
}
