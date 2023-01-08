import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { socket } from "../context/socket";
import { UserContext } from "../context/User";
import axios from "axios";
import "../styles/joinroom.scss";

function Join() {
  const history = useHistory();
  const [nameText, setNameText] = useState("");
  const [roomText, setRoomText] = useState("");

  const { userInfo, setUserInfo } = useContext(UserContext);

  socket.on("connect", () => {
    console.log("connected with id: " + socket.id);
  });

  const handleJoin = () => {
    if (roomText !== "" && nameText !== "") {
      return new Promise((resolve, reject) => {
        FindGame({ room: roomText });
      });
    } else {
      alert("wypełnij pola");
    }
  };

  const SendDataToJoin = () => {
    history.push("/wait");
    socket.emit("join-room", roomText, nameText);
    setUserInfo({ room: roomText, name: nameText, logged: true });
  };

  const FindGame = async (data) => {
    await axios.put(`http://localhost:5000/findgame`, data).then((response) => {
      if (response.data.Success !== "GameIsOn") {
        SendDataToJoin();
      } else {
        alert("Gra trwa");
      }
    });
  };

  return (
    <div className="join-room">
      <div className="login-form" >
        <div className="flex-row">
          <label className="lf--label" htmlFor="username">
            <svg x="0px" y="0px" width="12px" height="13px"></svg>
          </label>
          <input
            id="username"
            className="lf--input"
            placeholder="name"
            type="text"
            onChange={(e) => {
              setNameText(e.target.value);
            }}
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
        <button className="lf--submit" onClick={() => handleJoin()}>Join</button>
      </div>
    </div>
  );
}

export default Join;
