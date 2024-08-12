import React, { useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Glider from "./webGl/Glider";
import Navbar from "./jsx_comp/Navbar/Navbar";
import Introduction from "./jsx_comp/Main_Body/Introduction/Introduction";
import Loader from "./jsx_comp/Loader/Loader";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [fadeOutLoader, setFadeOutLoader] = useState(false);

  useEffect(() => {
    const loaderTimer = setTimeout(() => {
      setFadeOutLoader(true);
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(loaderTimer); // Cleanup timer on component unmount
    };
  }, []);

  return (
    <>
      {loading ? (
        <div className={`loader ${fadeOutLoader ? "hidden" : ""}`}>
          <Loader />
        </div>
      ) : (
        <div className="app">
          <div className="header">
            <Navbar />
            <Glider width={20} height={6} />
          </div>
          <div className="main_body">
            <Introduction />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
