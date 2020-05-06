import React, { Component } from "react";
import { Link } from "@reach/router";
import * as api from "../api";
import * as utils from "../utils";

class MenuBar extends Component {
  state = { topics: [] };

  componentDidMount() {
    api.getTopics().then((topics) => {
      this.setState({ topics });
    });
  }

  render() {
    const { user } = this.props;
    const { topics } = this.state;
    return (
      <nav className="navigation">
        <div className="navigation-content">
          <div className="logo padding">
            <Link to="/">NC News</Link>
          </div>
          <div className="menu-container">
            <ul className="menu">
              <li className="menu-dropdown">
                <div className="dropdown">
                  <button className="dropbtn">
                    Choose your Topic
                    <i className="fa fa-caret-down"></i>
                  </button>
                  <div className="dropdown-content">
                    {topics.map(({ slug }) => {
                      return (
                        <Link to={`/topic/${slug}/`} key={slug}>
                          {utils.capitalizeFirstLetter(slug)}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </li>
              <li className="menu-link">
                <Link to="/">Home</Link>
              </li>
              <li className="menu-link">
                <Link to="/articles">Articles</Link>
              </li>
            </ul>
          </div>
          <div className="userInfo">Welcome {user}</div>
        </div>
      </nav>
    );
  }
}

export default MenuBar;
