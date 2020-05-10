import React from "react";

import codingPicture from "../images/coding.jpg";
import footballPicture from "../images/football.jpg";
import cookingPicture from "../images/cooking.jpg";
import * as utils from "../../utils";

import { Link } from "@reach/router";

const HomepageCard = ({ slug }) => {
  let picture = "";
  if (slug === "coding") {
    picture = codingPicture;
  } else if (slug === "football") {
    picture = footballPicture;
  } else {
    picture = cookingPicture;
  }

  return (
    <div className="homepage-card">
      <Link to={`/topic/${slug}/`} key={`${slug}`}>
        <img
          key={slug}
          src={picture}
          alt={`${slug}`}
          className="homepage-card-img"
        />
      </Link>
      <div className="homepage-card-container">
        <div className="underlined underlined--thick">
          <Link to={`/topic/${slug}/`} key={`${slug}`}>
            {utils.capitalizeFirstLetter(slug)}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomepageCard;
