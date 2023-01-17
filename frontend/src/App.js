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
import { ResultsArray } from "./context/ResultsArray";
import ProfilePage from "./pages/ProfilePage";
import NavbarComponent from "./components/Navbar";
import { SeachUserContext } from "./context/SeachUser";

function App() {
  const [userInfo, setUserInfo] = useState();
  const [SeachUserInfo, setSeachUserInfo] = useState();
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
      <SeachUserContext.Provider value={{ SeachUserInfo, setSeachUserInfo }}>
        <UserContext.Provider value={{ userInfo, setUserInfo }}>
          <ActivePageContext.Provider value={{ ActivePage, setActivePage }}>
            <ResultsArray.Provider value={{ results_array, setResults_array }}>
              <div className="App">
                <Switch>
                  <Route exact path="/">
                    <NavbarComponent />
                    {userInfo ? redirectToPage(ActivePage) : <Login />}
                  </Route>
                  <Route path="/register">
                    <NavbarComponent />
                    <Register />
                  </Route>
                  <Route path="/profile">
                    <NavbarComponent />
                    {userInfo || SeachUserInfo ? <ProfilePage /> : <Login />}
                  </Route>
                </Switch>
              </div>
            </ResultsArray.Provider>
          </ActivePageContext.Provider>
        </UserContext.Provider>
      </SeachUserContext.Provider>
    </Beforeunload>
  );
}

export default App;
