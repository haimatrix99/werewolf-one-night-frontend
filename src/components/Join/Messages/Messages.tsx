import React, { useState } from "react";
import Message from "./Message/Message";
import { BiMessageSquareDetail } from "react-icons/bi";
import { useSocket } from "../../../providers/socket-provider";
import { useChatSocket } from "../../../hooks/use-chat-socket";
import { BsFillClipboard2Fill } from "react-icons/bs";
import toast from "react-hot-toast";

type MessagesProps = {
  name: string;
  code: string | undefined;
};

export default function Messages({ name, code }: MessagesProps) {
  const [message, setMessage] = useState("");
  const [sendButton, setSendButton] = useState(false);
  const { socket } = useSocket();

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

  const { messages } = useChatSocket({ messageKey: "room:message" });
  const copy = () => {
    navigator.clipboard.writeText(code as string);
    toast.success('Copied!')
  };

  return (
    <>
      <div className="flex flex-col mx-auto w-full h-[85%] min-h-[85%] bg-indigo-500 rounded-lg border-2 border-solid border-white">
        <div className="basic-[10%] px-4 py-2 border-b-2 border-white flex gap-4">
          <span className="text-white font-semibold text-lg">
            ID Phòng: {code}
          </span>
          <button className="text-white text-2xl" onClick={copy}>
            <BsFillClipboard2Fill />
          </button>
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
            placeholder="Nhập tin nhắn..."
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
    </>
  );
}
