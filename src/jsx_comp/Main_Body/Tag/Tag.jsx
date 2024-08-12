import React, { forwardRef } from "react";
import "./Tag.css";

const Tag = forwardRef(({ heading, tagline }, ref) => {
  return (
    <div className="tag" ref={ref}>
      <div id="heading">{heading}</div>
      <div id="tagline">{tagline}</div>
    </div>
  );
});

export default Tag;
