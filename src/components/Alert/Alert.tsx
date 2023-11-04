import React from "react";

type AlertProps = {
  message: string;
};

export default function Alert({ message }: AlertProps) {
  return (
    <div className="toast center top-[70px] w-fit text-white text-center text-xl px-2 py-1 bg-indigo-500 border rounded-lg">
      {message}
    </div>
  );
}
