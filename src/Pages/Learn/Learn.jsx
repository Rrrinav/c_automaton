import React from "react";
import { Outlet, Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import { topicsData } from "../../Data/topicsData";
import "./Learn.css";

const Learn = () => {
  return (
    <div className="learn-body">
      <div className="learn-container">
        <div className="learn-header">
          <h1>Learn Section</h1>
          <p>
            In this section we will try to increase our understanding and
            knowledge of Cellular automatons
          </p>
        </div>
        <div className="learn-divide"></div>
        <Outlet />
      </div>
      <div className="learn-sidebar">
        <h2>Contents</h2>
        <Sidebar data={topicsData} />
      </div>
    </div>
  );
};

export default Learn;
