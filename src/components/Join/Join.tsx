import React, { useCallback, useEffect, useReducer, useState } from "react";
import MessagesInRoom from "./Messages/Messages";
import { reducer } from "../../handlers/reducer";
import "./Join.css";
import { useNavigate } from "react-router-dom";
import queryString from "query-string";
import { useUserSocket } from "../../hooks/use-user-socket";
import Users from "./Users/Users";
import SelectRoles from "./SelectRoles/SelectRoles";
import { MAX_PLAYERS, MIN_PLAYERS } from "../../lib/constants";
import { pickRandomItems } from "../../handlers/pickRandomItems";
import { useGameSocket } from "../../hooks/use-game-socket";
import {
  ConnectionDetails,
  ConnectionDetailsBody,
  User,
} from "../../lib/types";
import { Role } from "../../lib/enums";
import { useStartGameSocket } from "../../hooks/use-start-game-socket";
import { AudioConference, LiveKitRoom } from "@livekit/components-react";
import { WebAudioContext } from "../../providers/audio-provider";
import Voice from "../Voice/Voice";

const initialValue = {
  rolesPool: [],
  numbers: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};

export default function Join() {
  const params = queryString.parse(window.location.search);
  const code = params.code as string;
  const name = params.name as string;

  const [{ rolesPool, numbers }, dispatch] = useReducer(reducer, initialValue);
  const navigate = useNavigate();
  const { users } = useUserSocket({ userKey: "users-online" });
  const roomMaster = users.filter((user) => user.master === true);
  const isRoomMaster = roomMaster[0]?.name === name ? true : false;
  const [rolesPlayer, setRolesPlayer] = useState<User[]>([]);
  const [threeRemainCard, setThreeRemainCard] = useState<Role[]>([]);
  const [signal, setSignal] = useState(false);

  const [connectionDetails, setConnectionDetails] =
    useState<ConnectionDetails | null>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  useEffect(() => {
    setAudioContext(new AudioContext());
    return () => {
      setAudioContext((prev) => {
        prev?.close();
        return null;
      });
    };
  }, []);

  useEffect(() => {
    if (connectionDetails === null) {
      (async (code: string, name: string) => {
        const body: ConnectionDetailsBody = {
          code,
          name,
        };
        const response = await fetch(
          `${process.env.REACT_APP_ENDPOINT}/api/voice/connection`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          }
        );

        if (response.status === 200) {
          const connectionDetails = await response.json();
          setConnectionDetails(connectionDetails);
        }
      })(code, name);
    }
  }, [code, name, connectionDetails]);

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
      setRolesPlayer(rolesPlayer);
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
    rolesPlayer,
    threeRemainCard,
  });
  const { startGame } = useGameSocket({ gameKey: "start-game" });

  useEffect(() => {
    if (startGame) {
      navigate(`/game?code=${code}&name=${name}`, { replace: true });
    }
  }, [startGame, code, name, navigate]);

  if (!audioContext || connectionDetails === null) {
    return (
      <div className="Join">
        <h1 className="Loading">Loading</h1>;
      </div>
    )
  }

  return (
    <LiveKitRoom
      token={connectionDetails.token}
      serverUrl={connectionDetails.ws_url}
      connect={true}
      audio={true}
      video={false}
      connectOptions={{ autoSubscribe: true }}
      options={{ expWebAudioMix: { audioContext } }}
    >
      <WebAudioContext.Provider value={audioContext}>
        <AudioConference />
        <Voice />
        <div className="Join">
          {isRoomMaster && (
            <SelectRoles numbers={numbers} dispatch={dispatch} />
          )}
          <div className="JoinCenterContainer">
            <MessagesInRoom name={name} code={code} />
            {isRoomMaster && (
              <button className="StartGameButton" onClick={handleStartGame}>
                Start Game
              </button>
            )}
          </div>
          <Users />
        </div>
      </WebAudioContext.Provider>
    </LiveKitRoom>
  );
}
