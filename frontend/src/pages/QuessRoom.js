import Timer from "../components/Timer";
import React, { useContext, useEffect, useState } from "react";
import { socket } from "../context/socket";
import { UserContext } from "../context/User";
import axios from "axios";
import "../styles/guessroom.scss";
import Chat from "../components/Chat";
import { ActivePageContext } from "../context/ActivePage";
import { ResultsArray } from "../context/ResultsArray";

function QuessRoom() {
  //context
  const { userInfo } = useContext(UserContext);
  const { setActivePage } = useContext(ActivePageContext);
  const { results_array, setResults_array } = useContext(ResultsArray);

  const [active_game, setActive_game] = useState();

  const [timer, settimer] = useState();

  socket.off("quess").on("quess", (user) => {
    console.log("robienie tablicy");
    setResults_array((results_array) => [
      ...results_array,
      { name: user, points: 0 },
    ]);
  });

  socket.off("adding-point").on("adding-point", (user) => {
    setResults_array(
      results_array.map((obj) => {
        if (obj.name === user) {
          return { ...obj, points: obj.points + 1 };
        }
        return obj;
      })
    );
  });

  const getGames = async (data) => {
    setTimeout(() => {
      axios.post(`http://localhost:5000/startquess`, data).then((response) => {
        displayGames(response.data);
        settimer(<Timer time={response.data.length * 15} />);
        socket.emit("start-quess", userInfo.room, userInfo.username);
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
        clearInterval(timer);
        axios.put(`http://localhost:5000/endgame`, { room: userInfo.room });
        socket.emit("leave-room", userInfo.room);
        setActivePage("ResultsPage");
      }
    }, 5000);
  }

  useEffect(() => {
    getGames({ room: userInfo.room });
  }, []);

  return (
    <div className="guess-room">
      <div className="timer-board-result">
        {timer}
        {active_game ? (
          <div className="board quess">
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
          <div className="timerboard">
            <Timer time={3} />
            <div className="board quess">
              
            </div>
          </div>
        )}
        {results_array ? (
          <div className="results">
            {results_array.map((user, index) => {
              return (
                <div className="result-quess" key={index}>
                  <div className="result-name">
                    <h2>{user.name}</h2>
                  </div>
                  <div className="result-points">
                    <h2>{user.points}</h2>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <></>
        )}
      </div>
      <Chat active_game={active_game} />
    </div>
  );
}

export default QuessRoom;
