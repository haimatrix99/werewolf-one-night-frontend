import React from "react";
import { TrackToggle } from "@livekit/components-react";
import { Track } from "livekit-client";

export default function Voice() {
  return (
    <TrackToggle
      source={Track.Source.Microphone}
      className="h-[48px] btn absolute right-[10px] bottom-[10px]"
    />
  );
}
