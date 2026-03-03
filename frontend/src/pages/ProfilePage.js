import React, { useContext } from "react";
import "../styles/profilepage.scss";
import { SeachUserContext } from "../context/SeachUser";
import { UserContext } from "../context/User";

function ProfilePage() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const { SeachUserInfo } = useContext(SeachUserContext);

  const handleLogout = () => {
    localStorage.removeItem("userInfo"); // usuń dane z localStorage
    setUserInfo(null); // wyczyść kontekst
    alert("Wylogowano!");
  };

  return (
    <div className="ProfilePage">
      {SeachUserInfo ? (
        <>
          <h1>{SeachUserInfo.username}</h1>
          <div className="stats-container">
            <div className="stats-div">
              <p>Points:</p>
              <img src="https://img.icons8.com/clouds/60/null/rating-circled.png" />
              <p className="p">{SeachUserInfo.stats.points}</p>
            </div>
            <div className="stats-div">
              <p>Games played:</p>
              <img src="https://img.icons8.com/arcade/60/null/games-folder.png" />
              <p className="p">{SeachUserInfo.stats.games_played}</p>
            </div>
            <div className="stats-div">
              <p>Podiums:</p>
              <img src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/58/null/external-podium-motor-sports-flaticons-lineal-color-flat-icons-2.png" />
              <p className="p">{SeachUserInfo.stats.podiums}</p>
            </div>
            <div className="stats-div">
              <p>Wins:</p>
              <img src="https://img.icons8.com/clouds/65/null/trophy--v2.png" />
              <p className="p">{SeachUserInfo.stats.won}</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1>Your Profile</h1>
          <div className="stats-container">
            <div className="stats-div">
              <p>Points:</p>
              <img src="https://img.icons8.com/clouds/60/null/rating-circled.png" />
              <p className="p">{userInfo.stats.points}</p>
            </div>
            <div className="stats-div">
              <p>Games played:</p>
              <img src="https://img.icons8.com/arcade/60/null/games-folder.png" />
              <p className="p">{userInfo.stats.games_played}</p>
            </div>
            <div className="stats-div">
              <p>Podiums:</p>
              <img src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/58/null/external-podium-motor-sports-flaticons-lineal-color-flat-icons-2.png" />
              <p className="p">{userInfo.stats.podiums}</p>
            </div>
            <div className="stats-div">
              <p>Wins:</p>
              <img src="https://img.icons8.com/clouds/65/null/trophy--v2.png" />
              <p className="p">{userInfo.stats.won}</p>
            </div>
          </div>
        </>
      )}

      {/* Prosty przycisk logout na dole */}
      {userInfo && (
        <div style={{ marginTop: "20px" }}>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;