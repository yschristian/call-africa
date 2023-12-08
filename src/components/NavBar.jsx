import "./NavBarStyles.css";

import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { logout as logoutAction } from "../redux/features/auth.feature";
import { UserContext } from "../hooks/useAuth";
import { useDispatch } from "react-redux";

import logo from "../assets/logo.png";

const NavBar = () => {
  const { logout, user } = useContext(UserContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutAction());
    logout();
    navigate("/home");
  };

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const [color, setcolor] = useState(false);
  const changeColor = () => {
    if (window.scrollY >= 10) {
      setcolor(true);
    } else {
      setcolor(false);
    }
  };
  let path = useLocation().pathname;
  !path.includes("dashboard") && window.addEventListener("scroll", changeColor);

  return (
    <div className={"fixed" + color ? "header header-bg" : "header"}>
      <Link to="/">
        <img src={logo} className="w-12" alt="Call Africa Logo" />
      </Link>
      <ul className={click ? "navmenu active" : "navmenu"}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          {" "}
          {!path.includes("dashboard") ? <Link to="/about">About</Link> : ""}
        </li>
        <li>
          {!path.includes("dashboard") ? (
            <Link to="/services">Services</Link>
          ) : (
            ""
          )}
        </li>
        <li>
          {!path.includes("dashboard") ? (
            <Link to="/contact">Contact Us</Link>
          ) : (
            ""
          )}
        </li>
        <li>
          {path.includes("dashboard") ? (
            <Link onClick={handleLogout}>Log Out</Link>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </li>
      </ul>
      <div className="hamburger" onClick={handleClick}>
        {click ? (
          <FaTimes size={20} style={{ color: "#fff" }} />
        ) : (
          <FaBars size={20} style={{ color: "#fff" }} />
        )}
      </div>
    </div>
  );
};

export default NavBar;
