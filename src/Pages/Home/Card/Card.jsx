import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { Link } from "react-router-dom"; // Import Link for internal routing
import "./Card.css";

function buttonComp({ text, localRoute, route }) {
  if (localRoute) {
    return (
      <Link to={route} className="card-button">
        {text}
      </Link>
    );
  } else {
    return (
      <a href={route} target="_blank" className="card-button">
        {text}
      </a>
    );
  }
}

const Card = ({ imageURL, title, description, button }) => {
  return (
    <div className="card">
      <img src={imageURL} alt={title} className="card-image" />
      <div className="card-content">
        <div className="card-heading">
          <span>{title}</span>
        </div>
        <div className="card-description">
          <p>{description}</p>
        </div>
        <div className="button-comp">{buttonComp(button)}</div>
      </div>
    </div>
  );
};

Card.propTypes = {
  imageURL: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  button: PropTypes.shape({
    text: PropTypes.string.isRequired,
    localRoute: PropTypes.bool,
    route: PropTypes.string.isRequired,
  }).isRequired,
};

export default Card;
