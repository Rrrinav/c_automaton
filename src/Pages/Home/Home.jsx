import React, {useEffect, useRef} from "react";
import {gsap} from "gsap";
import Glider from "../../webGl/Glider";
import "./Home.css";

const Home = () => {
  const tagRef = useRef(null);
  useEffect(() => {
    gsap.fromTo(
      tagRef.current,
      { opacity: 0, y: 50 },
      { duration: 2.5, opacity: 1, y: 0, ease: "power.out" },
    );
  }, []);
  return (
    <>
      <div className="main-body">
        <Glider width={20} height={6} />
        <div className="introduction">
          <div className="tag" ref={tagRef}>
            <div id="heading">Cellular Automaton</div>
            <div id="tagline">Complicated Systems from simple rules</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
