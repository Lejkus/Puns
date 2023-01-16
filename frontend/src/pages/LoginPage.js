import React, { useState, useContext } from "react";
import { UserContext } from "../context/User";
import axios from "axios";
import "../styles/joinroom.scss";
import { ActivePageContext } from "../context/ActivePage";

function Login() {
  //form
  const [loginText, setLoginText] = useState("");
  const [PasswordText, setPassword] = useState("");
  //context
  const { setUserInfo } = useContext(UserContext);
  const { setActivePage } = useContext(ActivePageContext);

  const handleLogin = () => {
    if (PasswordText !== "" && loginText !== "") {
      return new Promise((resolve, reject) => {
        SendDataToLogin({
          email: loginText,
          password: PasswordText,
        });
      });
    } else {
      alert("wypełnij pola");
    }
  };

  const SendDataToLogin = async (data) => {
    await axios
      .post(`http://localhost:5000/user/login`, data)
      .then((response) => {
        if (response.data.Success === "Loging succes!") {
          setUserInfo(response.data.userdata);
          setActivePage("JoinRoom");
        } else {
          alert(response.data.Success);
        }
      });
  };

  return (
    <div className="join-room">
      <div className="login-form">
        <div className="flex-row">
          <label className="lf--label" htmlFor="username">
            <svg x="0px" y="0px" width="12px" height="13px"></svg>
          </label>
          <input
            id="username"
            className="lf--input"
            placeholder="login"
            type="text"
            onChange={(e) => {
              setLoginText(e.target.value);
            }}
          ></input>
        </div>
        <div className="flex-row">
          <label className="lf--label" htmlFor="password">
            <svg x="0px" y="0px" width="15px" height="5px">
              <g></g>
            </svg>
          </label>
          <input
            id="password"
            className="lf--input"
            placeholder="password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>
        <button className="lf--submit" onClick={() => handleLogin()}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
