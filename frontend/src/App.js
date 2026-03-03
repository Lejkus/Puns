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
  const [userInfo, setUserInfo] = useState(() => {
    const savedUser = localStorage.getItem("userInfo");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [SeachUserInfo, setSeachUserInfo] = useState();
  const [ActivePage, setActivePage] = useState(() => {
    const savedPage = localStorage.getItem("ActivePage");
    return savedPage ? savedPage : null;
  });
  
  // gdy zmienia się ActivePage, zapisujemy w localStorage
  React.useEffect(() => {
    if (ActivePage) {
      localStorage.setItem("ActivePage", ActivePage);
    }
  }, [ActivePage]);
  const [results_array, setResults_array] = useState([]);

  function UnnlogUser(user) {
    try {
      axios.put(`http://localhost:4000/user/logout`, { _id: user._id });
      localStorage.removeItem("userInfo"); // <--- usuwa zapis po logout
      setUserInfo(null);
      setActivePage(null);
    } catch (error) {
      console.log(error);
    }
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
        return <Login />;
    }
  }
  console.log("userInfo:", userInfo);
console.log("ActivePage:", ActivePage);
  return (
    //<Beforeunload onBeforeunload={() => UnnlogUser(userInfo)}>
      <SeachUserContext.Provider value={{ SeachUserInfo, setSeachUserInfo }}>
        <UserContext.Provider value={{ userInfo, setUserInfo }}>
          <ActivePageContext.Provider value={{ ActivePage, setActivePage }}>
            <ResultsArray.Provider value={{ results_array, setResults_array }}>
              <div className="App">
                <Switch>
                  <Route exact path="/">
                    <NavbarComponent />
                    {userInfo  ? redirectToPage(ActivePage) : <Login />}
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
    //</Beforeunload>
  );
}

export default App;
