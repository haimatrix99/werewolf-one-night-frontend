import React, { useEffect, useState } from "react";
import { AiFillClockCircle } from "react-icons/ai";
import "./Clock.css";

type ClockProps = {
  counter: number;
};

export default function Clock({ counter }: ClockProps) {
  const [second, setSecond] = useState(counter);
  const [done, setDone] = useState(false);
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (second > 0) {
      timer = setTimeout(() => setSecond((c) => c - 1), 1000);
    } else {
      setDone(true);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [second]);
  return (
    <div className="Clock">
      <button className="ClockIcon ClockIconLeft">
        <AiFillClockCircle />
      </button>
      <span className="Time">{!done ? second : "Done"}</span>
      <button className="ClockIcon ClockIconRight">
        <AiFillClockCircle />
      </button>
    </div>
  );
}
