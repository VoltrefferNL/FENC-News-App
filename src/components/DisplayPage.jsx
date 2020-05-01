import React, { Component } from "react";
import { Router } from "@reach/router";

class DisplayPage extends Component {
  render() {
    return (
      <div>
        <div>
          <ul>
            <div className="query-area">
              <li>Votes</li>
              <li>Date Created</li>
              <li>Comments</li>
            </div>
            <div className="articleslist-area">
              <li>List of Articles on display here</li>
            </div>
            <div className="content-area">
              The content here (Article, comments)
            </div>
          </ul>
        </div>
      </div>
    );
  }
}

export default DisplayPage;
