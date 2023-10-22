import { createContext, useContext, useEffect, useRef, useState } from "react";

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

  // Remember the latest callback.
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
}: {
  children: React.ReactNode;
  totalTurn: number;
}) => {
  const initialTimer = 15;
  const [turn, setTurn] = useState(0);
  const [counter, setCounter] = useState(initialTimer);
  const [done, setDone] = useState(false);

  useInterval(() => {
    setCounter(counter - 1);
    if (counter === 0) {
      setTurn(turn + 1);
      if (turn === totalTurn - 1) {
        setCounter(300);
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
