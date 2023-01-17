import "../styles/navbar.scss";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/User";
import { SeachUserContext } from "../context/SeachUser";
import axios from "axios";
import { useHistory } from "react-router-dom";

function NavbarComponent() {
  const { userInfo } = useContext(UserContext);
  const { SeachUserInfo, setSeachUserInfo } = useContext(SeachUserContext);
  const [text, setText] = useState("");

  const history = useHistory();

  const FindUser = async () => {
    await axios
      .post(`http://localhost:5000/user/profile`, { username: text })
      .then((response) => {
        if (response.data) {
          setSeachUserInfo(response.data);
          history.push("/profile");
        } else {
          alert("No find user");
        }
      });
  };

  useEffect(() => {
    const nav = document.querySelector(".nav"),
      searchIcon = document.querySelector("#searchIcon"),
      navOpenBtn = document.querySelector(".navOpenBtn"),
      navCloseBtn = document.querySelector("#searchIcon");

    searchIcon.addEventListener("click", () => {
      nav.classList.toggle("openSearch");
      nav.classList.remove("openNav");
      if (nav.classList.contains("openSearch")) {
        return searchIcon.classList.replace("uil-search", "uil-times");
      }
      searchIcon.classList.replace("uil-times", "uil-search");
    });

    navOpenBtn.addEventListener("click", () => {
      nav.classList.add("openNav");
      nav.classList.remove("openSearch");
      searchIcon.classList.replace("uil-times", "uil-search");
    });

    navCloseBtn.addEventListener("click", () => {
      nav.classList.remove("openNav");
    });
  }, []);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unicons.iconscout.com/release/v4.0.0/css/line.css"
      />
      <nav className="nav">
        <i className="uil uil-bars navOpenBtn"></i>
        <Link className="logo" to="/">
          Puns
        </Link>

        <ul className="nav-links">
          <i className="uil uil-times navCloseBtn"></i>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <a href="https://github.com/Lejkus/Puns">Github</a>
          </li>
        </ul>

        <i
          className="uil uil-search search-icon"
          id="searchIcon"
          onClick={() => {
            setSeachUserInfo("");
          }}
        ></i>
        <div className="search-box">
          <i
            onClick={() => {
              FindUser();
            }}
            className="uil uil-search search-icon"
          ></i>
          <input
            type="text"
            onChange={(e) => {
              setText(e.target.value);
            }}
            placeholder="Search user..."
          />
        </div>
      </nav>
    </>
  );
}

export default NavbarComponent;
