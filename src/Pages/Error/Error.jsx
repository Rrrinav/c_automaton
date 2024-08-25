// src/Pages/Error/Error.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Error.css"; // Optional: Create custom styles

const Error = () => {
  return (
    <div className="error-page">
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you're looking for doesn't exist.</p>
      <Link to="/" className="go-home">
        Go Back Home
      </Link>
    </div>
  );
};

export default Error;
