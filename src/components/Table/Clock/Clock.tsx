import { AiFillClockCircle } from "react-icons/ai";

type ClockProps = {
  done: boolean;
  second: number;
};

export default function Clock({ done, second }: ClockProps) {
  return (
    <div className="w-fit flex justify-between items-center mx-auto px-2 py-1 my-2 border border-solid rounded-lg bg-indigo-500 md:px-4 md:py-2 md:my-4">
      <AiFillClockCircle className="text-xl text-white md:text-2xl" />
      <span className="text-xl text-white text-center font-semibold mx-8 md:text-2xl">
        {!done ? second : "Done"}
      </span>
      <AiFillClockCircle className="text-xl text-white md:text-2xl" />
    </div>
  );
}
