import React, { useState } from "react";
import { BiSolidMicrophone, BiSolidMicrophoneOff } from "react-icons/bi";
import "./Voice.css";

export default function Voice() {
  const [voice, setVoice] = useState(false);
  return (
    <div className="Voice">
      <button
        className="VoiceButton"
        onClick={() => {
          setVoice(!voice);
        }}
      >
        {voice ? <BiSolidMicrophone /> : <BiSolidMicrophoneOff />}
      </button>
    </div>
  );
}
