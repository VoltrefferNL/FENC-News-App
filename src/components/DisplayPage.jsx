import React, { Component } from "react";
import { Router } from "@reach/router";

class DisplayPage extends Component {
  render() {
    return (
      <div className="displaypage-container">
        <div className="content">
          <ul className="left-article-list">
            <div className="query-area">
              <li>Votes</li>
              <li>Date Created</li>
              <li>Comments</li>
            </div>

            <li>List of Articles on display here</li>
          </ul>
          <div className="content-area">
            <div>The content here (Article, comments)</div>
          </div>
        </div>
      </div>
    );
  }
}

export default DisplayPage;
