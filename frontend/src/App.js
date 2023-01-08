import React from "react";
import Game from "./pages/GameRoom";
import Join from "./pages/JoinRoom";
import { Route, Switch } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "./context/User";
import Timer from "./components/Timer";
import WaitPage from "./pages/WaitRoom";
import GuessRoom from "./pages/GuessRoom"

function App() {
  const [userInfo, setUserInfo] = useState({ logged: false });
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      <div className="App">
        <Switch>
          <Route exact path="/">
            {userInfo.logged ? <Game /> : <Join />}
          </Route>
          <Route exact path="/wait">
            {userInfo.logged ? <WaitPage /> : <Join />}
          </Route>
          <Route exact path="/guess">
            {userInfo.logged ? <GuessRoom /> : <Join />}
          </Route>
        </Switch>
      </div>
    </UserContext.Provider>
  );
}

export default App;
