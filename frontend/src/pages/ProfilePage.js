import React from "react";
import "../styles/profilepage.scss";
class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = { username: props.user.username, stats: props.user.stats };
  }

  render() {
    return (
      <div className="ProfilePage">
        <h1>{this.state.username}</h1>
        <div className="stats-container">
          <div className="stats-div">
            <p>Points:</p><img src="https://img.icons8.com/clouds/60/null/rating-circled.png"/> <p className="p">  {this.state.stats.points}</p>
          </div>
          <div className="stats-div">
            <p>Games played:</p><img src="https://img.icons8.com/arcade/60/null/games-folder.png"/> <p className="p"> {this.state.stats.games_played}</p>
          </div>
          <div className="stats-div">
            <p>Podiums:</p><img src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/58/null/external-podium-motor-sports-flaticons-lineal-color-flat-icons-2.png"/> <p className="p">{this.state.stats.podiums}</p>
          </div>
          <div className="stats-div">
            <p>Wins:</p> <img src="https://img.icons8.com/clouds/65/null/trophy--v2.png"/><p className="p">{this.state.stats.won}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfilePage;
