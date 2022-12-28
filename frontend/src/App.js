import React from "react";
import Game from "./pages/Game";
import Join from "./pages/Join";
import { Route, Switch } from "react-router-dom";
import { useState } from "react";
import { UserContext } from "./context/User";
import Timer from "./components/Timer";

function App() {
  const [userInfo, setUserInfo] = useState({ logged: false });
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      <div className="App">
        <Switch>
          <Route exact path="/">
            {userInfo.logged ? <Game /> : <Join />}
          </Route>
          <Route exact path="/t">
            <Timer time={30}/>
          </Route>
        </Switch>
      </div>
    </UserContext.Provider>
  );
}

export default App;
