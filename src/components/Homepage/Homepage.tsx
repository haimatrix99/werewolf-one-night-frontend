import React, { useState } from "react";
import randomCodeGenerate from "../../handlers/randomCodeGenerator";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../providers/socket-provider";
import { User } from "../../lib/types";
import Footer from "../Footer/Footer";
import toast from "react-hot-toast";

export default function Homepage() {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { socket } = useSocket();

  const handleButtonCreate = async () => {
    if (name === "") {
      toast.error("Tên không được để trống khi tạo phòng!");
    } else {
      const code = randomCodeGenerate(6);
      socket.emit("room:create", { name, code });
      navigate(`/room?code=${code}&name=${name}`);
    }
  };

  const handleButtonJoin = async () => {
    if (name === "" || code === "") {
      toast.error(
        "Tên hoặc ID phòng không được để trống khi tham gia vào phòng!"
      );
    } else {
      socket.emit("room:join", { name, code }, (result: User | string) => {
        if (result === "Username is taken.") {
          toast.error("Tên đã tồn tại trong phòng!");
          navigate("/", { replace: true });
        }
        if (result === "Code is not be exist.") {
          toast.error("ID phòng không tồn tại!");
          navigate("/", { replace: true });
        }
      });
      navigate(`/room?code=${code}&name=${name}`);
    }
  };

  return (
    <>
      <div className="relative center w-full bg-slate-600 text-center border rounded-lg border-solid p-6 md:w-fit">
        <div className="mb-[36px]">
          <h1 className="font-semibold text-[36px] text-white">
            Werewolf One Night
          </h1>
          <img
            className="absolute left-1/2 top-[20px] h-8 icon"
            src={"/images/icon.png"}
            alt="Icon"
          />
        </div>
        <div className="flex flex-col justify-center items-center md:flex-row md:space-x-2">
          <input
            className="input-homepage"
            type="text"
            placeholder="Nhập tên"
            onChange={(event) => setName(event.target.value)}
          />
          <div className="flex flex-col justify-center items-center">
            <input
              className="input-homepage"
              type="text"
              placeholder="Nhập ID phòng"
              onChange={(event) => setCode(event.target.value)}
            />
            <button className="btn" onClick={handleButtonJoin}>
              Join
            </button>
          </div>
          <p className="uppercase font-semibold text-2xl text-white my-2">Or</p>
          <button className="btn" onClick={handleButtonCreate}>
            Create
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}
