import React from "react";
import "./Voice.css";
import { TrackToggle } from "@livekit/components-react";
import { Track } from "livekit-client";

export default function Voice() {
  return (
    <div className="Voice">
      <TrackToggle source={Track.Source.Microphone} className="VoiceButton" />
    </div>
  );
}
