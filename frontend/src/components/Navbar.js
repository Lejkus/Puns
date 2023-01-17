import "../styles/navbar.scss";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/User";

function NavbarComponent() {
  const { userInfo } = useContext(UserContext);
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
  },[]);

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
            {userInfo ? (
              <Link to="/profile">Profile</Link>
            ) : (
              <Link to="/">Profile</Link>
            )}
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <a href="https://github.com/Lejkus/Puns">Github</a>
          </li>
        </ul>

        <i className="uil uil-search search-icon" id="searchIcon"></i>
        <div className="search-box">
          <i className="uil uil-search search-icon"></i>
          <input type="text" placeholder="Search user..." />
        </div>
      </nav>
    </>
  );
}

export default NavbarComponent;
