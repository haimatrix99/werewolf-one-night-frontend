import { useEffect, useState } from "react";
import { ConnectionDetails, ConnectionDetailsBody } from "../lib/types";

export const useVoiceConnection = (code: string, name: string) => {
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
          `${
            process.env.REACT_APP_ENDPOINT ||
            "https://werewolf-one-night-backend-j4pyzzodnq-as.a.run.app"
          }/api/voice/connection`,
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
      })(code, name.trim().toLowerCase());
    }
  }, [code, name, connectionDetails]);

  return {audioContext, connectionDetails}
};
