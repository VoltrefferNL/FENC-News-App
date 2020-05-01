import React, { Component } from "react";
import { Router, Link } from "@reach/router";
import * as api from "../api";
import * as utils from "../utils";

class DisplayPage extends Component {
  state = {
    articles: [],
  };

  componentDidMount() {
    console.log("here?");
    api.getArticles().then((articles) => {
      this.setState({ articles });
    });
  }

  // componentDidUpdate;

  render() {
    const { articles } = this.state;
    console.log(this.state.articles);
    return (
      <div className="displaypage-container">
        <div className="content">
          <ul className="left-article-list">
            <div className="query-area">
              Sort by:
              <Link to="/articles/votes">Votes</Link>
              <Link to="/articles/votes">Date Created</Link>
              <Link to="/articles/votes">Comments</Link>
            </div>
            {articles.map(
              ({
                author,
                title,
                article_id,
                topic,
                created_at,
                votes,
                comment_count,
              }) => {
                return (
                  <li key={article_id} className="article-list-card">
                    <div className="article-list-card-text">
                      <li>{title}</li>
                      <div className="article-list-card-interactions">
                        <span>
                          <p>Topic: {utils.capitalizeFirstLetter(topic)}</p>
                        </span>
                        <span>
                          <p>Comments: {comment_count}</p>
                        </span>
                        <div>
                          <p>Votes: {votes}</p>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              }
            )}
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
