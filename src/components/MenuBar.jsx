import React, { Component } from "react";
import { Link } from "@reach/router";

class MenuBar extends Component {
  render() {
    const { user } = this.props;
    return (
      <nav className="navigation">
        <div className="logo">
          <Link to="/">NC News</Link>
        </div>
        <ul className="menu">
          <li className="menu-dropdown">
            <select id="topics">
              <option value="">Choose your topic</option>
              <option value="Football">Football</option>
              <option value="Cooking">Cooking</option>
              <option value="coding">Coding</option>
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
      </nav>
    );
  }
}

export default MenuBar;
