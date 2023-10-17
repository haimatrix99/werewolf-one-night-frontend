import React, { useState } from "react";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import "./Sound.css";

export default function Sound() {
  const [sound, setSound] = useState(false);

  return (
    <div className="Sound">
      <button
        className="SoundButton"
        onClick={() => {
          setSound(!sound);
        }}
      >
        {sound ? <HiSpeakerWave /> : <HiSpeakerXMark />}
      </button>
    </div>
  );
}
