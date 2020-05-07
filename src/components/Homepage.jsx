import React from "react";
import codePicture from "./images/code.jpg";
import footballPicture from "./images/football.jpg";
import cookingPicture from "./images/cooking.jpg";
import { Link } from "@reach/router";

const Homepage = () => {
  return (
    <div className="homepage-container">
      <div className="homepage-card">
        <Link to={`/topic/coding/`} key="coding">
          <img src={codePicture} alt="coding" className="homepage-card-img" />
        </Link>
        <div className="homepage-card-container">
          <div className="underlined underlined--thick">
            <Link to={`/topic/coding/`} key="coding">
              Coding
            </Link>
          </div>
        </div>
      </div>
      <div className="homepage-card">
        <Link to={`/topic/cooking/`} key="football">
          <img
            src={cookingPicture}
            alt="cooking"
            className="homepage-card-img"
          />
        </Link>
        <div className="homepage-card-container">
          <div className="underlined underlined--thick">
            <Link to={`/topic/cooking/`} key="cooking">
              Cooking
            </Link>
          </div>
        </div>
      </div>
      <div className="homepage-card">
        <Link to={`/topic/football/`} key="football">
          <img
            src={footballPicture}
            alt="football"
            className="homepage-card-img"
          />
        </Link>
        <div className="homepage-card-container">
          <div className="underlined underlined--thick">
            <Link to={`/topic/football/`} key="football">
              Football
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
