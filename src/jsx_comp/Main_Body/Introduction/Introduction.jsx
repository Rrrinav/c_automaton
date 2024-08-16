import React, { useRef, useEffect } from "react";
import "./Introduction.css";
import Tag from "../Tag/Tag";
import gsap from "gsap";

const Introduction = () => {
  const tagRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      tagRef.current,
      { opacity: 0, y: 50 },
      { duration: 2.0, opacity: 1, y: 0, ease: "power2.out" },
    );
  }, []);

  return (
    <div className="introduction">
      <Tag
        ref={tagRef}
        heading={"Cellular Automaton"}
        tagline={"Complicated systems from simple rules"}
      />
    </div>
  );
};

export default Introduction;
