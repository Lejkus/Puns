import React, { useState, useContext } from "react";
import { UserContext } from "../context/User";
import { ActivePageContext } from "../context/ActivePage";
import axios from "axios";
import "../styles/joinroom.scss";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUserInfo } = useContext(UserContext);
  const { setActivePage } = useContext(ActivePageContext);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Wypełnij wszystkie pola!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/user/login", {
        email,
        password,
      });

      const data = response.data;

      if (data.Success === "Loging succes!") {
        // zapis do localStorage
        localStorage.setItem("userInfo", JSON.stringify(data.userdata));

        // ustawienie contextów
        setUserInfo(data.userdata);
        setActivePage("JoinRoom");
      } else {
        alert(data.Success);
      }
    } catch (error) {
      console.error(error);
      alert("Błąd sieci lub serwera. Spróbuj ponownie.");
    }
  };

  return (
    <div className="join-room">
      <div className="login-form">
        <div className="flex-row">
          <label className="lf--label" htmlFor="email"></label>
          <input
            id="email"
            className="lf--input"
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex-row">
          <label className="lf--label" htmlFor="password"></label>
          <input
            id="password"
            className="lf--input"
            placeholder="Hasło"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="lf--submit" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;