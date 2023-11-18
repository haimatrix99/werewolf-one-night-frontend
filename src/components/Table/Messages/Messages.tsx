import React, { useState } from "react";
import Message from "./Message/Message";
import { BiMessageSquareDetail } from "react-icons/bi";
import { useChatSocket } from "../../../hooks/use-chat-socket";
import { useSocket } from "../../../providers/socket-provider";
import { BiSolidMessageAltDetail } from "react-icons/bi";

type MessagesProps = {
  code: string;
  name: string;
  show: boolean;
  onClickButton: () => void;
};

export default function Messages({
  code,
  name,
  show,
  onClickButton,
}: MessagesProps) {
  const [message, setMessage] = useState("");
  const [sendButton, setSendButton] = useState(false);
  const { socket } = useSocket();
  const { messages } = useChatSocket({ messageKey: "room:message" });

  const sendMessage = (event: React.KeyboardEvent<HTMLInputElement> | null) => {
    if (event) {
      event.preventDefault();
    }

    if (message) {
      socket.emit("room:user-message", { code, name, message }, () =>
        setMessage("")
      );
    }
  };

  return (
    <>
      <button
        className="h-[48px] btn absolute right-[70px] bottom-[10px]"
        onClick={onClickButton}
      >
        <BiSolidMessageAltDetail />
      </button>
      {show && (
        <div className="z-10 center flex flex-col mx-auto w-full h-[80%] min-h-[80%] bg-indigo-500 rounded-lg border-2 border-solid border-white md:w-[60%]">
          <div className="basic-[10%] px-4 py-2 border-b-2 border-white flex gap-4">
            <span className="text-white font-semibold text-lg">
              Room ID: {code}
            </span>
          </div>
          <div className="basis-full h-full flex flex-col-reverse overflow-y-scroll">
            {messages.map((message, index) => (
              <div key={index}>
                <Message message={message} name={name}></Message>
              </div>
            ))}
          </div>
          <div className="basis-[10%] flex mt-[10px]">
            <input
              type="text"
              className="basis-full"
              placeholder="Type a message..."
              value={message}
              onChange={({ target: { value } }) => setMessage(value)}
              onKeyPress={(event) =>
                event.key === "Enter" && message !== ""
                  ? sendMessage(event)
                  : null
              }
            />
            <button
              className="text-2xl text-white p-2"
              onClick={() => {
                setSendButton(!sendButton);
                sendMessage(null);
              }}
              disabled={message === "" ? true : false}
            >
              <BiMessageSquareDetail />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
