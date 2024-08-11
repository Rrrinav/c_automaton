import React from "react";
import "./Tag.css";

const Tag = ({heading, tagline}) => {
  return (
    <div className="tag">
      <div id="heading">{heading}</div>
      <div id="tagline">{tagline}</div>
    </div>
  );
};

export default Tag;
