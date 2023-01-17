import React, { useState, useContext } from "react";
import { socket } from "../context/socket";
import { UserContext } from "../context/User";
import { ActivePageContext } from "../context/ActivePage";
import axios from "axios";
import "../styles/joinroom.scss";

function Join() {
  //context
  const { setActivePage } = useContext(ActivePageContext);
  const { userInfo, setUserInfo } = useContext(UserContext);

  const [roomText, setRoomText] = useState("");

  console.log(userInfo);

  socket.on("connect", () => {
    console.log("connected with id: " + socket.id);
  });

  const handleJoin = () => {
    if (roomText !== "") {
      return new Promise((resolve, reject) => {
        FindGame({ room: roomText });
      });
    } else {
      alert("fill the inputs");
    }
  };

  const SendDataToJoin = () => {
    setActivePage("WaitPage");
    //history.push("/wait");
    socket.emit("join-room", roomText, userInfo.username);
    setUserInfo((userInfo) => ({
      ...userInfo,
      room: roomText,
    }));
  };

  const FindGame = async (data) => {
    await axios.put(`http://localhost:5000/findgame`, data).then((response) => {
      if (response.data.Success !== "GameIsOn") {
        SendDataToJoin();
      } else {
        alert("Game is on");
      }
    });
  };

  return (
    <div className="join-room">
      <div className="login-form">
        <div className="flex-row">
          <label className="lf--label" htmlFor="username">
            <svg x="0px" y="0px" width="12px" height="13px"></svg>
          </label>

          <input
            className="lf--input username-input"
            type="text"
            value={"Login as : " + userInfo.username}
            disabled
          ></input>
        </div>
        <div className="flex-row">
          <label className="lf--label" htmlFor="password">
            <svg x="0px" y="0px" width="15px" height="5px">
              <g></g>
            </svg>
          </label>
          <input
            id="password"
            className="lf--input"
            placeholder="room"
            type="text"
            onChange={(e) => {
              setRoomText(e.target.value);
            }}
          ></input>
        </div>
        <button className="lf--submit" onClick={() => handleJoin()}>
          Join
        </button>
      </div>
    </div>
  );
}

export default Join;
