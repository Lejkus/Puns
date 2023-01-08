import Timer from "../components/Timer";
import { useHistory } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { socket } from "../context/socket";
import { UserContext } from "../context/User";
import axios from "axios";
import "../styles/guessroom.scss";
import Chat from "../components/Chat";

function GuessRoom() {
  const history = useHistory();
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [active_game, setActive_game] = useState();
  const [timer, settimer] = useState();

  const getGames = async (data) => {
    setTimeout(() => {
      axios.post(`http://localhost:5000/startquess`, data).then((response) => {
        displayGames(response.data);
        settimer(<Timer time={response.data.length*15} />);
      });
    }, 3000);
  };

  function displayGames(games) {
    setActive_game(games[0]);
    var number = 1;
    var timer = setInterval(() => {
      if (typeof games[number] !== "undefined") {
        setActive_game(games[number]);
        number += 1;
      } else {
        // setActive_game({ game: ["red", "black"] });
        clearInterval(timer);
        axios.put(`http://localhost:5000/endgame`, { room: userInfo.room });
        setUserInfo({ room: "", name: "", logged: false });
        history.push("/");
      }
    }, 15000);
  }

  useEffect(() => {
    getGames({ room: userInfo.room });
  }, []);






  return (
    <div className="guess-room">
      {active_game ? (
        <div className="board">
          {active_game.game.map((color, index) => {
            const divcolor = {
              background: color,
            };
            return (
              <div className="single-box" key={index} style={divcolor}></div>
            );
          })}
        </div>
      ) : (
        <Timer time={3} />
      )}
      {timer}
      <Chat active_game={active_game} />
    </div>
  );
}

export default GuessRoom;
