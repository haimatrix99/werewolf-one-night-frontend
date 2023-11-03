import React from "react";

type MessageProps = {
  message: {
    user: string;
    text: string;
  };
  name: string;
};

export default function Message({
  message: { user, text },
  name,
}: MessageProps) {
  let isSentByCurrentUser = false;
  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }
  return isSentByCurrentUser ? (
    <div className="flex gap-2 justify-end mx-[20px] my-[4px]">
      <p className="text-white font-semibold text-lg">{user}</p>
      <span className="text-white border-2 border-solid rounded-lg bg-green-500 px-4 py-1 w-fit max-w-[90%] break-words">
        {text}
      </span>
    </div>
  ) : (
    <div className="flex gap-2 justify-start mx-[20px] my-[4px]">
      <span className="text-white border-2 border-solid rounded-lg bg-pink-500 px-4 py-1 w-fit max-w-[90%] break-words">{text}</span>
      <p className="text-white font-semibold text-lg">{user}</p>
    </div>
  );
}
