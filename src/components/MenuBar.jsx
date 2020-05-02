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

  handleChange(invoke) {
    this.props.filterTopic(invoke);
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
          <ul className="menu">
            <li className="menu-dropdown">
              <select
                id="topics"
                onChange={(e) => {
                  this.handleChange(e.target.value);
                }}
              >
                {console.log(this.state, "THIS IS IN MENU")}
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
          <div className="userInfo">Welcome {user}</div>
        </div>
      </nav>
    );
  }
}

export default MenuBar;
