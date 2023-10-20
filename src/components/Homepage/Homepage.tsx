import React, { useState } from "react";
import "./Homepage.css";
import randomCodeGenerate from "../../handlers/randomCodeGenerator";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  
  const handleButtonCreate = () => {
    if (name === "") {
      alert("Usename must not be empty");
    } else {
      navigate(`/room?code=${randomCodeGenerate(6)}`, { replace: true });
    }
  };

  const handleButtonJoin = () => {
    if (name === "" || code === "") {
      alert("Usename or code must not be empty");
    } else {
      navigate(`/room?code=${code}`, { replace: true });
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
