import React from "react";
import queryString from "query-string";
import Table from "../Table/Table";
import { useStatusGameSocket } from "../../hooks/use-status-game-socket";
import { ClockProvider } from "../../providers/clock-provider";
import { WebAudioContext } from "../../providers/audio-provider";
import { AudioConference, LiveKitRoom } from "@livekit/components-react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useVoiceConnection } from "../../hooks/use-voice-connection";
import { getTurn } from "../../util/getTurn";
import { User } from "../../lib/types";

export default function Game() {
  const params = queryString.parse(window.location.search);
  const code = params.code as string;
  const name = params.name as string;

  const { audioContext, connectionDetails } = useVoiceConnection(code, name);
  const { players, threeRemainCard, discussTime, isEnded } =
    useStatusGameSocket({
      gameKey: "game:info",
      code,
      name,
    });

  const roles = [...threeRemainCard, ...players.map((player) => player.role)];

  const { totalTurn, turnCall, soundCall } = getTurn(roles);

  if (!audioContext || connectionDetails === null || players.length === 0) {
    return (
      <ClockProvider
        totalTurn={totalTurn}
        discussTime={Number(discussTime) * 60}
      >
        <div className="h-screen flex flex-col flex-1 justify-center items-center">
          <AiOutlineLoading3Quarters className="text-3xl animate-spin" />
          <h1 className="text-3xl">Loading</h1>
        </div>
      </ClockProvider>
    );
  }

  return (
    <div className="h-full w-full">
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
        className="h-[90%] w-full"
      >
        <></>
        <WebAudioContext.Provider value={audioContext}>
          <AudioConference className="hidden" />
          <ClockProvider
            totalTurn={totalTurn}
            discussTime={Number(discussTime) * 60}
            soundCall={soundCall}
            isEnded={isEnded}
          >
            <Table
              code={code}
              roles={roles}
              players={players}
              currentUser={
                players.find((player) => player.name === name) as User
              }
              threeRemainCard={threeRemainCard}
              turnCall={turnCall}
              isEnded={isEnded}
            />
          </ClockProvider>
        </WebAudioContext.Provider>
      </LiveKitRoom>
    </div>
  );
}
