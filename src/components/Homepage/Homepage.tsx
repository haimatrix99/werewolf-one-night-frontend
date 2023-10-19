import React from "react";
import "./Homepage.css";

export default function Homepage() {
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
            />
          </div>
          <div className="HomepageBody">
            <div className="HomepageJoinRoom">
              <input
                type="text"
                className="HomepageInput"
                placeholder="Enter a code room"
              />
              <button className="HomepageButton">Join</button>
            </div>
            <p className="CreateOrJoinText">OR</p>
            <div className="HomepageCreate">
              <button className="HomepageButton HomepageButtonCreate">
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
