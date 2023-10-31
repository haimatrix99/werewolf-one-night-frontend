import React, { useState } from "react";
import "./Homepage.css";
import randomCodeGenerate from "../../handlers/randomCodeGenerator";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../../providers/socket-provider";
import { User } from "../../lib/types";

export default function Homepage() {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { socket } = useSocket();

  const handleButtonCreate = async () => {
    if (name === "") {
      alert("Username must not be empty");
    } else {
      const code = randomCodeGenerate(6);
      socket.emit("create-room", { name, code }, (result: User) => {});
      navigate(`/room?code=${code}&name=${name}`);
    }
  };

  const handleButtonJoin = async () => {
    if (name === "" || code === "") {
      alert("Username or code must not be empty");
    } else {
      socket.emit("join", { name, code }, (result: User | string) => {
        if (result === "Username is taken.") {
          alert(result);
          navigate("/", { replace: true });
        }
      });
      navigate(`/room?code=${code}&name=${name}`);
    }
  };

  return (
    <div className="Homepage">
      <div className="HomepageContainer">
        <div className="HomepageHeader">
          <img
            className="werewolfIcon"
            src={require("../../assets/werewolf-clip-art-8.png")}
            alt="Icon"
          ></img>
          <h1 className="HomepageTitle">Werewolf One Night</h1>
        </div>
        <div className="HomepageInfo">
          <div className="HomepageName">
            <input
              type="text"
              className="HomepageInput"
              placeholder="Enter a name"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="HomepageBody">
            <div className="HomepageJoinRoom">
              <input
                type="text"
                className="HomepageInput"
                placeholder="Enter a code room"
                onChange={(event) => setCode(event.target.value)}
              />
              <button className="HomepageButton" onClick={handleButtonJoin}>
                Join
              </button>
            </div>
            <p className="CreateOrJoinText">OR</p>
            <div className="HomepageCreate">
              <button
                className="HomepageButton HomepageButtonCreate"
                onClick={handleButtonCreate}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
