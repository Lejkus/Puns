import React, { useState} from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Register() {
  //form
  const [loginText, setLoginText] = useState("");
  const [PasswordText, setPassword] = useState("");
  const [usernameText, setUsernameText] = useState("");
  const [ConfPasswordText, setConfPassword] = useState("");

  const history = useHistory();

  const handleRegister = () => {
    if (PasswordText !== "" && loginText !== "") {
      return new Promise((resolve, reject) => {
        SendDataToRegister({
          email: loginText,
          username:usernameText,
          password: PasswordText,
          passwordConf:ConfPasswordText
        });
      });
    } else {
      alert("wypełnij pola");
    }
  };

  const SendDataToRegister = async (data) => {
    await axios
      .post(`http://localhost:5000/user`, data)
      .then((response) => {
        if (response.data.Success === "You are regestered,You can login now.") {
          alert(response.data.Success);
          history.push('/')
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
            className="lf--input"
            placeholder="login"
            type="text"
            onChange={(e) => {
              setLoginText(e.target.value);
            }}
          ></input>
        </div>
        <div className="flex-row">
          <label className="lf--label" htmlFor="username">
            <svg x="0px" y="0px" width="12px" height="13px"></svg>
          </label>
          <input
            id="username"
            className="lf--input"
            placeholder="username"
            type="text"
            onChange={(e) => {
              setUsernameText(e.target.value);
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
        <div className="flex-row">
          <label className="lf--label" htmlFor="password">
            <svg x="0px" y="0px" width="15px" height="5px">
              <g></g>
            </svg>
          </label>
          <input
            id="password"
            className="lf--input"
            placeholder="Confirm password"
            type="password"
            onChange={(e) => {
              setConfPassword(e.target.value);
            }}
          ></input>
        </div>
        <button className="lf--submit" onClick={() => handleRegister()}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Register;
