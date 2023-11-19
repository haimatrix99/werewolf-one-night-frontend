import { createContext, useContext, useEffect, useRef, useState } from "react";
import { SOUNDS } from "../lib/constants";

type ClockContextType = {
  counter: number;
  turn: number;
  done: boolean;
};

const ClockContext = createContext<ClockContextType>({
  counter: 0,
  turn: 0,
  done: false,
});

export const useClock = () => {
  return useContext(ClockContext);
};

function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<any>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    let id = setInterval(() => {
      savedCallback.current();
    }, delay);
    return () => clearInterval(id);
  }, [delay]);
}

export const ClockProvider = ({
  children,
  totalTurn,
  discussTime,
  soundCall,
  isEnded,
}: {
  children: React.ReactNode;
  totalTurn: number;
  discussTime: number;
  soundCall?: string[];
  isEnded?: boolean;
}) => {
  const initialTimer = 15;
  const [turn, setTurn] = useState(0);
  const [counter, setCounter] = useState(initialTimer);
  const [done, setDone] = useState(false);
  const audio = useRef<HTMLAudioElement>();

  useEffect(() => {
    if (soundCall) {
      const roleCall = soundCall.at(turn);
      if (roleCall) {
        audio.current = new Audio("%PUBLIC_URL%" + SOUNDS[roleCall]);
        audio.current.play();
      } else if (
        roleCall === undefined &&
        turn === totalTurn &&
        !done &&
        !isEnded
      ) {
        audio.current = new Audio("%PUBLIC_URL%" + SOUNDS["Thảo luận"]);
        audio.current.play();
      }
    }
  }, [soundCall, turn, totalTurn, done, isEnded]);

  useInterval(() => {
    setCounter((prevCounter) => prevCounter - 1);
    if (counter === 0) {
      setTurn((prevTurn) => prevTurn + 1);
      if (turn === totalTurn - 1) {
        setCounter(discussTime);
      } else if (turn === totalTurn) {
        setDone(true);
      } else {
        setCounter(initialTimer);
      }
    }
  }, 1000);

  return (
    <ClockContext.Provider value={{ turn, done, counter }}>
      {children}
    </ClockContext.Provider>
  );
};
