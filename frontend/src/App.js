import React, { useState } from "react";
import Game from "./pages/GameRoom";
import Join from "./pages/JoinRoom";
import { Route, Switch } from "react-router-dom";
import { UserContext } from "./context/User";
import WaitPage from "./pages/WaitRoom";
import QuessRoom from "./pages/QuessRoom";
import Login from "./pages/LoginPage";
import { ActivePageContext } from "./context/ActivePage";
import { Beforeunload } from "react-beforeunload";
import axios from "axios";
import Register from "./pages/RegisterPage";
import ResultsPage from "./pages/ResultsPage";
import {ResultsArray} from './context/ResultsArray'


function App() {
  const [userInfo, setUserInfo] = useState();
  const [ActivePage, setActivePage] = useState();
  const [results_array, setResults_array] = useState([]);

  function UnnlogUser(user) {
    try {
      axios.put(`http://localhost:5000/user/logout`, { _id: user._id });
    } catch (error) {}
  }

  function redirectToPage(page) {
    switch (page) {
      case "WaitPage":
        return <WaitPage />;
      case "JoinRoom":
        return <Join />;
      case "GamePage":
        return <Game />;
      case "QuessPage":
        return <QuessRoom />;
      case "ResultsPage":
        return <ResultsPage />;
      default:
        <Login />;
    }
  }
  return (
    <Beforeunload onBeforeunload={() => UnnlogUser(userInfo)}>
      <UserContext.Provider value={{ userInfo, setUserInfo }}>
        <ActivePageContext.Provider value={{ ActivePage, setActivePage }}>
          <ResultsArray.Provider value={{ results_array, setResults_array }}>
            <div className="App">
              <Switch>
                <Route exact path="/">
                  {userInfo ? redirectToPage(ActivePage) : <Login />}
                </Route>

                <Route path="/register">
                  <Register />
                </Route>
              </Switch>
            </div>
          </ResultsArray.Provider>
        </ActivePageContext.Provider>
      </UserContext.Provider>
    </Beforeunload>
  );
}

export default App;
