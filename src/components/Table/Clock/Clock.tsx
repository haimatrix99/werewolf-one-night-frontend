import { AiFillClockCircle } from "react-icons/ai";

type ClockProps = {
  done: boolean;
  second: number;
};

export default function Clock({ done, second }: ClockProps) {
  return (
    <div className="w-fit flex justify-between items-center mx-auto px-4 py-2 my-4 border border-solid rounded-lg bg-indigo-500">
      <AiFillClockCircle className="text-2xl text-white"/>
      <span className="text-2xl text-white text-center font-semibold mx-8">{!done ? second : "Done"}</span>
      <AiFillClockCircle className="text-2xl text-white"/>
    </div>
  );
}
