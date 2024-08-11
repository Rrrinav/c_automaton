import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <span id="logo">[ C_automaton ]</span>
      <ul className="list">
        <li className="list_elem">About</li>
        <li className="list_elem">Contact</li>
        <li className="list_elem">List</li>
      </ul>
    </div>
  );
};

export default Navbar;
