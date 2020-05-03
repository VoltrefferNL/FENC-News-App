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

  handleChange(topic) {
    this.props.filterTopic(topic);
  }

  render() {
    const { user } = this.props;
    const { topics } = this.state;
    return (
      <nav className="navigation">
        <div className="navigation-content">
          <div className="logo">
            <Link to="/">NC News</Link>
          </div>
          <div className="menu-container">
            <ul className="menu">
              <li className="menu-dropdown">
                <select
                  id="topics"
                  onChange={(e) => {
                    this.handleChange(e.target.value);
                  }}
                >
                  <option value="">Choose your topic</option>
                  {topics.map(({ slug }) => {
                    return (
                      <option key={slug} value={slug}>
                        {utils.capitalizeFirstLetter(slug)}
                      </option>
                    );
                  })}
                </select>
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
