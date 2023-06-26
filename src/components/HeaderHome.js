import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiCameraSwitchFill } from "react-icons/ri";
import { BiLogOut, BiHomeAlt } from "react-icons/bi";
import { IoMdClock } from "react-icons/io";
import { AiFillCarryOut } from "react-icons/ai";
import { getGreetingMessage } from "./Greet";
import Clock from "../components/Clock";
import "./HeaderHome.scss";
import "./Greet.scss";

const HeaderHome = () => {
  const [showClock, setShowClock] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("로그아웃 하시겠습니까?");
    if (confirmLogout) {
      localStorage.removeItem("username");
      navigate("/");
    }
  };

  const toggleClock = () => {
    setShowClock((prevShowClock) => !prevShowClock);
  };

  const handleGoToTodos = () => {
    navigate("/Todos");
  };

  return (
    <div className="Header">
      <nav>
        <button id="log-out" onClick={handleLogout}>
          <BiLogOut className="react-icon" />
        </button>
        <ul className="Navigation">
          <li id="toggle-clock">
            <label className="toggle-switch">
              <input
                type="checkbox"
                id="toggle-check"
                checked={showClock}
                onChange={toggleClock}
              />
              <IoMdClock className="react-icon" id="clock-icon" />
            </label>
          </li>
          <li id="go-todo" onClick={handleGoToTodos}>
            <AiFillCarryOut className="react-icon" />
          </li>
          <Link to="/Home">
            <li id="go-home">
              <BiHomeAlt style={{ color: "#fff" }} className="react-icon" />
            </li>
          </Link>
        </ul>
      </nav>
      {showClock && <Clock />}
      {!showClock && (
        <p className="getGreetingMessage">
          {getGreetingMessage(new Date().getHours(), localStorage.getItem("username"))}
        </p>
      )}
    </div>
  );
};

export default HeaderHome;
