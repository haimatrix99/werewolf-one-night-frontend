import React, { useEffect, useState } from "react";
import "./Game.css";
import queryString from "query-string";
import Table from "../Table/Table";
import { useRoleGameSocket } from "../../hooks/use-role-game-socket";
import { shuffle } from "../../handlers/shuffleArray";
import { ClockProvider } from "../../providers/clock-provider";
import { Role } from "../../lib/enums";
import { ConnectionDetails, ConnectionDetailsBody } from "../../lib/types";
import { WebAudioContext } from "../../providers/audio-provider";
import { AudioConference, LiveKitRoom } from "@livekit/components-react";

export default function Game() {
  const params = queryString.parse(window.location.search);
  const code = params.code as string;
  const name = params.name as string;
  let totalTurn: number = 1;
  const turnCall: string[] = ["check card"];

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

  const { rolesPlayer, threeRemainCard } = useRoleGameSocket({
    roleKey: "game-info",
    code: code.toLowerCase(),
  });

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
      <div className="Join">
        <h1 className="Loading">Loading</h1>;
      </div>
    );
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
        <ClockProvider totalTurn={totalTurn}>
          <div className="Game">
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
          </div>
        </ClockProvider>
      </WebAudioContext.Provider>
    </LiveKitRoom>
  );
}
