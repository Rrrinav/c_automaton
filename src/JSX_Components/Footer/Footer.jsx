import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-about">
          <span className="logo-text">Cellular Automaton</span>
          <p id="intro-text">
            Website made as a learning project to explore React, WebGL, GSAP,
            and many other front-end technologies.
          </p>
          <div className="social-icons">
            <a href="https://twitter.com" aria-label="Twitter" target="_blank">
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://facebook.com"
              aria-label="Facebook"
              target="_blank"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://linkedin.com"
              aria-label="LinkedIn"
              target="_blank"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a
              href="https://github.com/rrrinav"
              aria-label="GitHub"
              target="_blank"
            >
              <i className="fab fa-github"></i>
            </a>
            <a href="https://opensource.org/license/mit" target="_blank">
              <i className="fas fa-balance-scale"></i>
            </a>
          </div>
        </div>
        <div className="links">
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/learn">Learn</Link>
              </li>
              <li>
                <a href="https://opensource.org/license/mit" target="_blank">
                  Lisence
                </a>
              </li>
              <li>
                <a href="https://github.com/rrrinav/c_automaton" target="_blank">
                  Repo
                </a>
              </li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4>Contact Us</h4>
            <p>
              <i className="fas fa-envelope"></i> &nbsp; rinavhansa4@gmail.com
            </p>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Cellular Automaton. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
