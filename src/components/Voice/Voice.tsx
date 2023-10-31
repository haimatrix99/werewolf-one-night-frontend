import React from "react";
import "./Voice.css";
import { TrackToggle, useMediaDeviceSelect } from "@livekit/components-react";
import { Track } from "livekit-client";

export default function Voice() {
  const { devices, activeDeviceId, setActiveMediaDevice } =
    useMediaDeviceSelect({ kind: "audioinput" });

  return (
    <>
      <div className="Voice">
        <TrackToggle source={Track.Source.Microphone} className="VoiceButton" />
      </div>
      <div className="Audio">
        <select
          onChange={(e) => {
            setActiveMediaDevice(e.currentTarget.value);
          }}
          value={activeDeviceId}
          className="AudioSelect"
        >
          {devices.map((m) => (
            <option value={m.deviceId} key={m.deviceId}>
              {m.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
