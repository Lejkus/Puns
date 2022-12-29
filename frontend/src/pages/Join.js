import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { socket } from "../context/socket";
import { UserContext } from "../context/User";
import axios from "axios";

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
    socket.emit("join-room", roomText, nameText);
    history.push("/waiting");
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
    <div>
      <label>Imie</label>
      <input
        onChange={(e) => {
          setNameText(e.target.value);
        }}
        placeholder="Enter Text"
      />
      <label>Pokuj</label>
      <input
        onChange={(e) => {
          setRoomText(e.target.value);
        }}
        placeholder="Enter Text"
      />
      <button onClick={() => handleJoin()}>Dołącz</button>
    </div>
  );
}

export default Join;
