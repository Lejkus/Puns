import react, { useContext, useEffect, useMemo, useState } from "react";
import "../styles/gameroom.scss";
import { colors } from "../constants/colors";
import Chat from "../components/Chat";
import Timer from "../components/Timer";
import { topics, getRandomTopic } from "../constants/topics";
import { useHistory } from "react-router-dom";
import { socket } from "../context/socket";
import axios from "axios";
import { UserContext } from "../context/User";

function Game() {
  const [board, setBoard] = useState([]);
  const [activeColor, setActiveColor] = useState("snow");
  const [topic, setTopic] = useState(() => getRandomTopic(topics));
  const history = useHistory();
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [koniec, setKoniec] = useState(false);

  useMemo(() => {
    for (let i = 0; i < 630; i++) {
      board.push("snow");
    }
  }, []);

  setTimeout(() => setKoniec(true), 10000);

  const drawEnd = async (userInfo) => {
    const data = {
      room: userInfo.room,
      games: [
        {
          user: userInfo.name,
          topic: topic,
          game: board,
        },
      ],
    };
    await axios
      .put(`http://localhost:5000/enddraw`, data)
      .then(setUserInfo({ logged: false }))
      .then(history.push("/"));
  };

  const handleResetBoard = () => {
    setBoard([...board.map((color, index) => (board[index] = "snow"))]);
  };

  const hangeColorChange = (color) => {
    setActiveColor(color);
    console.log(activeColor);
  };

  const hangePaint = (number) => {
    setBoard([
      ...board.map((color, index) =>
        index === number ? (board[index] = activeColor) : color
      ),
    ]);
  };

  useEffect(() => {
    if (koniec) {
      drawEnd(userInfo);
    }
  }, [koniec]);

  return (
    <div className="game-chat-container">
      <div className="game">
        <div className="title-timer-container">
          <h1>Draw: {topic}</h1>
          <Timer time={60} />
        </div>

        <div className="board">
          <div></div>
          {board.map((color, index) => {
            const divcolor = {
              background: color,
            };
            return (
              <div
                className="single-box"
                key={index}
                style={divcolor}
                onClick={() => hangePaint(index)}
              ></div>
            );
          })}
        </div>
        <div className="colorpalette">
          {colors.map((color, index) => {
            const divcolor = {
              background: color,
            };
            return (
              <div
                className="single-color-box"
                key={index}
                style={divcolor}
                onClick={() => hangeColorChange(color)}
              ></div>
            );
          })}
        </div>

        <button className="button-24" role="button" onClick={handleResetBoard}>
          Reset
        </button>
        {/* <button onClick={() => drawEnd(userInfo)}>End</button> */}
      </div>
      <div className="chat-container">
        <Chat />
      </div>
    </div>
  );
}

export default Game;
