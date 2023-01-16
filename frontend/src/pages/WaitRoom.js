import Chat from "../components/Chat";
import Timer from "../components/Timer";
import { useContext, useState } from "react";
import { socket } from "../context/socket";
import { UserContext } from "../context/User";
import axios from "axios";
import "../styles/waitroom.scss";
import { ActivePageContext } from "../context/ActivePage";

function WaitPage() {
  const { userInfo } = useContext(UserContext);
  const [start, setStart] = useState(false);
  const { setActivePage } = useContext(ActivePageContext);

  socket.on("game-started", () => {
    setStart(true);
    setTimeout(() => setActivePage("GamePage"), 1000);
  });

  const HandleStartGame = () => {
    StartGame({ room: userInfo.room });
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
      <button
        className="button-24"
        role="button"
        onClick={() => HandleStartGame()}
      >
        Start
      </button>
      {start ? <Timer time={10} /> : <></>}
    </div>
  );
}

export default WaitPage;
