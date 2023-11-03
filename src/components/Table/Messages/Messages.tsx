import React, { useState } from "react";
import Message from "./Message/Message";
import { BiMessageSquareDetail } from "react-icons/bi";
import { useChatSocket } from "../../../hooks/use-chat-socket";
import { useSocket } from "../../../providers/socket-provider";
import { BiSolidMessageAltDetail } from "react-icons/bi";
import { BsFillClipboard2Fill } from "react-icons/bs";

type MessagesProps = {
  code: string;
  name: string;
};

export default function Messages({ code, name }: MessagesProps) {
  const [messageToSend, setMessage] = useState("");
  const [sendButton, setSendButton] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const { socket } = useSocket();

  const sendMessage = (event: React.KeyboardEvent<HTMLInputElement> | null) => {
    if (event) {
      event.preventDefault();
    }

    if (messageToSend) {
      socket.emit("user-message", messageToSend, () => setMessage(""));
    }
  };

  const { messages } = useChatSocket({ messageKey: "message" });

  const handleButton = () => {
    setShowMessages(!showMessages);
  };

  return (
    <>
      <button
        className="h-[48px] btn absolute right-[70px] bottom-[10px]"
        onClick={handleButton}
      >
        <BiSolidMessageAltDetail />
      </button>
      {showMessages && (
        <div className="z-50 center flex flex-col mx-auto w-full h-[80%] min-h-[80%] bg-indigo-500 rounded-lg border-2 border-solid border-white md:w-[60%]">
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
              value={messageToSend}
              onChange={({ target: { value } }) => setMessage(value)}
              onKeyPress={(event) =>
                event.key === "Enter" && messageToSend !== ""
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
              disabled={messageToSend === "" ? true : false}
            >
              <BiMessageSquareDetail />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
