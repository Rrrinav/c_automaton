import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Glider from "../../webGl/Glider";
import cell from "../../assets/cells2.jpg";
import "./Home.css";

const Home = () => {
  const tagRef = useRef(null);
  const imageRef = useRef(null);
  const detailsRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  useEffect(() => {
    gsap.fromTo(
      tagRef.current,
      { opacity: 0, y: 70 },
      { duration: 1.5, opacity: 1, y: 0, ease: "power3.out" },
    );
  }, []);

  useEffect(() => {
    gsap.fromTo(
      imageRef.current,
      { opacity: 0, x: 70 },
      { duration: 1.5, opacity: 1, x: 0, ease: "power3.out" },
    );
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        detailsRef.current,
        { opacity: 0, y: 70 },
        {
          opacity: 1,
          y: 0,
          duration: 2.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: detailsRef.current,
            start: "top bottom",
            scrub: 1,
          },
        },
      );
    });

    // Force a refresh of ScrollTrigger
    ScrollTrigger.refresh();

    return () => {
      ctx.revert(); // This will clean up the animation and ScrollTrigger
    };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".details > *", {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: detailsRef.current,
          start: "top bottom-=100",
        },
      });
    });

    return () => ctx.revert();
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
          <div className="image" id="cells-1" ref={imageRef}>
            <img src={cell} alt="cells" id="cells-home-1" />
          </div>
        </div>
        <div className="details" ref={detailsRef}>
          <div id="details-heading">
            <span>Why this website?</span>
          </div>
          <p id="details-description">
            This is <span className="bold-text">Cellular Automaton Wiki,</span>{" "}
            a resource dedicated to exploring the fascinating world of cellular
            automata. These complex systems, governed by simple rules, reveal
            how <span className="bold-text">intricate patterns </span>and
            behaviors emerge from the simplest of structures. Whether you're a
            beginner or a seasoned enthusiast, dive in to discover how these
            mathematical models simulate real-world phenomena and contribute to
            various fields like computation, biology, and art.
          </p>
        </div>
        <div className="sections">
          <section className="learn"></section>
        </div>
      </div>
    </>
  );
};

export default Home;
