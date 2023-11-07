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
  const [discussTime, setDiscussTime] = useState("10");

  const { users } = useUserSocket({ userKey: "users-online" });
  const roomMaster = users.filter((user) => user.master === true);
  const isRoomMaster = roomMaster[0]?.name === name ? true : false;
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
      alert(
        "Không thể bắt đầu game khi không đủ số lượng người chơi hoặc thẻ bài"
      );
    }
  };
  useStartGameSocket({
    gameKey: "game",
    signal,
    code,
    players,
    threeRemainCard,
    discussTime: Number(discussTime) * 60,
  });
  const { startGame } = useGameSocket({ gameKey: "start-game" });

  useEffect(() => {
    if (startGame) {
      navigate(`/game?code=${code}&name=${name}`);
    }
  }, [startGame, code, name, navigate]);

  if (!audioContext || connectionDetails === null) {
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
                  Start Game
                </button>
              )}
            </div>
            <Setup
              code={code}
              numbers={numbers}
              dispatch={dispatch}
              discussTime={discussTime}
              onDiscussTimeChange={setDiscussTime}
              isRoomMaster={isRoomMaster}
              isMobile={isMobile}
            />
            <Users users={users} isMobile={isMobile} />
            <Voice />
          </div>
        </WebAudioContext.Provider>
      </LiveKitRoom>
    </div>
  );
}
