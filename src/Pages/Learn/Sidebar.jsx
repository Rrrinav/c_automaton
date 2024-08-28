import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Sidebar.css";

const SidebarItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();

  const handleClick = () => {
    if (item.subtopics.length > 0) {
      setIsOpen(!isOpen);
    }
  };

  useEffect(() => {
    setIsActive(location.pathname.includes(item.path));
  }, [location, item]);

  return (
    <div>
      <div className="sidebar-item">
        <NavLink
          to={item.path}
          onClick={handleClick}
          className={isActive ? "cont-active" : "cont-not-active" }
        >
          {item.title}
        </NavLink>
        {item.subtopics.length > 0 && (
          <div className={`subtopics ${isOpen ? "open" : "closed"}`}>
            {item.subtopics.map((subItem, index) => (
              <SidebarItem key={index} item={subItem} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Sidebar = ({ data }) => {
  return (
    <div className="sidebar">
      {data.map((item, index) => (
        <SidebarItem key={index} item={item} />
      ))}
    </div>
  );
};

export default Sidebar;
