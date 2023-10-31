import React from "react";
import "./Voice.css";
import {
  TrackToggle,
  useMediaDeviceSelect,
  useTracks,
} from "@livekit/components-react";
import { RoomEvent, Track } from "livekit-client";

export default function Voice() {
  const { devices, activeDeviceId, setActiveMediaDevice } =
    useMediaDeviceSelect({ kind: "audioinput" });

  const tracks = useTracks(
    [{ source: Track.Source.Microphone, withPlaceholder: true }],
    { updateOnlyOn: [RoomEvent.ActiveSpeakersChanged] }
  );
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
