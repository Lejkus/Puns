import React, { useContext, useEffect, useState } from "react";
import { ActivePageContext } from "../context/ActivePage";
import "../styles/resultpage.scss";
import { ResultsArray } from "../context/ResultsArray";
import { UserContext } from "../context/User";
import axios from "axios";

function ResultsPage() {
  const { results_array, setResults_array } = useContext(ResultsArray);
  const { setActivePage } = useContext(ActivePageContext);
  const { userInfo } = useContext(UserContext);

  function reset() {
    setActivePage("JoinRoom");
    setResults_array([]);
  }

  results_array.sort((a, b) => {
    return a.points - b.points;
  });

  function sendResults() {
    let won = 0;
    let podium = 0;

    results_array.reverse().map((user, index) => {
      if (user.name === userInfo.username) {
        if (index === 0) {
          won = 1;
          podium = 1;
        } else if (index < 3) {
          podium = 1;
        }
      }
    });

    const usertab = results_array.find(
      ({ name }) => name === userInfo.username
    );

    axios
      .put(`http://localhost:5000/user/updatestats`, {
        _id: userInfo._id,
        username: userInfo.username,
        stats: {
          points: userInfo.stats.points + usertab.points,
          games_played: userInfo.stats.games_played + 1,
          won: userInfo.stats.won + won,
          podiums: userInfo.stats.podiums + podium,
        },
      })
      .then((response) => {});
  }

  useEffect(() => {
    sendResults();
  }, []);

  return (
    <div className="results-page">
      <button
        onClick={() => {
          reset();
        }}
      >BACK</button>
      {results_array.reverse().map((user, index) => {
        if (index == 0) {
          return (
            <>
              <h1>WINNER!</h1>
              <div className="result-1" key={index}>
                <div className="result-name">
                  <h2>{user.name}</h2>
                </div>
                <div className="result-points">
                  <h2>{user.points}</h2>
                </div>
              </div>
            </>
          );
        } else if (index == 1) {
          return (
            <div className="result-2" key={index}>
              <div className="result-name">
                <h2>{user.name}</h2>
              </div>
              <div className="result-points">
                <h2>{user.points}</h2>
              </div>
            </div>
          );
        } else if (index == 2) {
          return (
            <div className="result-3" key={index}>
              <div className="result-name">
                <h2>{user.name}</h2>
              </div>
              <div className="result-points">
                <h2>{user.points}</h2>
              </div>
            </div>
          );
        } else {
          return (
            <div className="result" key={index}>
              <div className="result-name">
                <h2>{user.name}</h2>
              </div>
              <div className="result-points">
                <h2>{user.points}</h2>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}

export default ResultsPage;
