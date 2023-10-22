import { AiFillClockCircle } from "react-icons/ai";
import "./Clock.css";

type ClockProps = {
  done: boolean;
  second: number;
};

export default function Clock({ done, second }: ClockProps) {
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
