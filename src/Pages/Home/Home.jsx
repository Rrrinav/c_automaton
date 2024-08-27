import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Glider from "../../webGl/Glider";
import cell from "../../assets/Linea.png";
import Card from "./Card/Card";
import { Link } from "react-router-dom";
import "./Home.css";
import { cardsData } from "../../Data/CardData";

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
      { duration: 2, opacity: 1, y: 0, ease: "power3.out" },
    );
  }, []);

  useEffect(() => {
    gsap.fromTo(
      imageRef.current,
      { opacity: 0, x: 70 },
      { duration: 2, opacity: 1, x: 0, ease: "power3.out" },
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
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: detailsRef.current,
            scrub: true,
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
        duration: 0.5,
        stagger: 0.06,
        ease: "power3.out",
        scrollTrigger: {
          trigger: detailsRef.current,
          start: "top bottom",
          end: "bottom 50%",
          scrub: 1,
        },
      });
    });

    return () => ctx.revert(); // Cleanup on unmount
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".learn > *", {
        opacity: 0,
        y: 30,
        duration: 1.5,
        stagger: 0.6,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".learn",
          start: "top 60%",
          end: "center center",
          scrub: 1,
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
        <div className="details-wrapper">
          <div className="details" ref={detailsRef}>
            <div id="details-heading">
              <span>Why this website?</span>
            </div>
            <p id="details-description">
              This is{" "}
              <span className="bold-text">Cellular Automaton Wiki,</span> a
              resource dedicated to exploring the fascinating world of cellular
              automata. These complex systems, governed by simple rules, reveal
              how <span className="bold-text">intricate patterns </span>and
              behaviors emerge from the{" "}
              <span className="bold-text">simplest of structures.</span> Whether
              you're a beginner or a seasoned enthusiast, dive in to discover
              how these mathematical models{" "}
              <span className="bold-text">simulate real-world phenomena </span>
              and contribute to various fields like computation, biology, and
              art.
            </p>
          </div>
        </div>
        <div className="sections">
          <div className="sections-heading">Learn</div>
          <section className="learn">
            <div className="learn-cards">
              {cardsData.map((card, index) => (
                <Card
                  key={index}
                  imageURL={card.imageURL}
                  title={card.title}
                  description={card.description}
                  button={card.button}
                  className="cards"
                />
              ))}{" "}
            </div>
            <div className="learn-buttons">
              <Link to="/learn" className="learn-button">
                Get started
              </Link>
              <Link to="/resources" className="learn-button">
                Resources
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Home;
