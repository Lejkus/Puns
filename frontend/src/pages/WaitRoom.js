import Chat from "../components/Chat";
import Timer from "../components/Timer";
import { useHistory } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { socket } from "../context/socket";
import { UserContext } from "../context/User";
import axios from "axios";
import "../styles/waitroom.scss";

function WaitPage() {
  const history = useHistory();
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [start, setStart] = useState(false);

  socket.on("game-started", () => {
    setStart(true);
    setTimeout(() => history.push("/"), 10000);
  });

  const HandleStartGame = () => {
    StartGame({ room: userInfo.room });
    // socket.emit("start-game", userInfo.room);
    // setStart(true)
  };

  const StartGame = async (data) => {
    await axios
      .put(`http://localhost:5000/startgame`, data)
      .then((response) => {
        if (response.data.Success === "gameStarted") {
          socket.emit("start-game", userInfo.room);
          setStart(true);
        } else {
          alert("Nie wystartowano");
        }
      });
  };

  return (
    <div className="wait-room">
      <Chat />
      <button className="button-24" role="button" onClick={() => HandleStartGame()}>
        Start
      </button>
      {start ? <Timer time={10} /> : <></>}
    </div>
  );
}

export default WaitPage;
