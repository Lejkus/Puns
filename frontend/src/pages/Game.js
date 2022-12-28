import react, { useMemo, useState } from "react";
import "../styles/board.css";
import { colors } from "../components/colors";
import Chat from "../components/Chat";
import Timer from "../components/Timer";

function Game() {
  const [board, setBoard] = useState([]);
  const [activeColor, setActiveColor] = useState("red");

  useMemo(() => {
    for (let i = 0; i < 630; i++) {
      board.push("snow");
    }
  }, []);

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

  return (
    <div className="game-chat-container">
      <div className="game">
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
        <button onClick={handleResetBoard}>Reset</button>

        <Timer time={60}/>
      </div>
      <Chat />
    </div>
  );
}

export default Game;
