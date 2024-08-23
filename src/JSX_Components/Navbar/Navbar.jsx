import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <span id="logo">
        <NavLink
          to="/" 
        >
          [ C_automaton ]
        </NavLink>
      </span>
      <ul className="list">
        <li className="list_elem">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
        </li>
        <li className="list_elem">
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            About
          </NavLink>
        </li>
        <li className="list_elem">
          <NavLink
            to="/contact"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Contact
          </NavLink>
        </li>
        <li className="list_elem">
          <NavLink
            to="/learn"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Learn
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
