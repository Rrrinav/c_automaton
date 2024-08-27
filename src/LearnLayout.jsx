import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./Learn.css";

const Learn = () => {
  return (
    <div className="learn-container">
      <aside className="sidebar">
        <nav>
          <ul>
            <li>
              <Link to="basic-intro">Basic Introduction</Link>
            </li>
            <li>
              <Link to="game-of-life">Conway's Game of Life</Link>
            </li>
            <li>
              <Link to="elementary-automaton">
                Elementary Cellular Automaton
              </Link>
            </li>
            {/* Add more links as needed */}
          </ul>
        </nav>
      </aside>
      <div className="learn-content">
        <Outlet />
      </div>
    </div>
  );
};

export default Learn;
