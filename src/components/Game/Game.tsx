import React from "react";
import queryString from "query-string";
import Table from "../Table/Table";
import { useRoleGameSocket } from "../../hooks/use-role-game-socket";
import { shuffle } from "../../handlers/shuffleArray";
import { ClockProvider } from "../../providers/clock-provider";
import { Role } from "../../lib/enums";
import { WebAudioContext } from "../../providers/audio-provider";
import { AudioConference, LiveKitRoom } from "@livekit/components-react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useVoiceConnection } from "../../hooks/use-voice-connection";

export default function Game() {
  const params = queryString.parse(window.location.search);
  const code = params.code as string;
  const name = params.name as string;
  
  const { audioContext, connectionDetails} = useVoiceConnection(code, name)
  const { rolesPlayer, threeRemainCard } = useRoleGameSocket({
    roleKey: "game-info",
    code: code.toLowerCase(),
  });

  let totalTurn: number = 1;
  const turnCall: string[] = ["check card"];
  const roles = shuffle([
    ...threeRemainCard,
    ...rolesPlayer.map((user) => user.role),
  ]);

  if (roles.includes(Role.Werewolf)) {
    totalTurn++;
    turnCall.push("Werewolf");
  }
  if (roles.includes(Role.Seer)) {
    totalTurn++;
    turnCall.push("Seer");
  }
  if (roles.includes(Role.Robber)) {
    totalTurn++;
    turnCall.push("Robber");
  }
  if (roles.includes(Role.Troublemaker)) {
    totalTurn++;
    turnCall.push("Troublemaker");
  }
  if (roles.includes(Role.Drunk)) {
    totalTurn++;
    turnCall.push("Drunk");
  }
  if (roles.includes(Role.Insomniac)) {
    totalTurn++;
    turnCall.push("Insomniac");
  }

  if (!audioContext || connectionDetails === null) {
    return (
      <div className="h-screen flex flex-col flex-1 justify-center items-center">
        <AiOutlineLoading3Quarters className="text-3xl animation-spin"/>
        <h1 className="text-3xl">Loading</h1>
      </div>
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
        <WebAudioContext.Provider value={audioContext}>
          <AudioConference className="hidden" />
          <ClockProvider totalTurn={totalTurn}>
            {rolesPlayer.length > 0 && (
              <Table
                code={code}
                roles={roles}
                users={rolesPlayer}
                currentUser={
                  rolesPlayer.filter((user) => user.name === name)[0]
                }
                threeRemainCard={threeRemainCard}
                turnCall={turnCall}
              />
            )}
          </ClockProvider>
        </WebAudioContext.Provider>
      </LiveKitRoom>
    </div>
  );
}
