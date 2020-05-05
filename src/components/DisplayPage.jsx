import React, { Component } from "react";
import { Router, Link } from "@reach/router";
import * as api from "../api";
import * as utils from "../utils";
import ArticleView from "./ArticleView";

class DisplayPage extends Component {
  state = {
    articles: [],
    sort_url: "no_sort",
    article_url: "no_article",
  };

  componentDidMount() {
    this.getArticles();
  }

  componentDidUpdate(prevProps, prevState) {
    const { sort_url } = this.state;
    const { topic } = this.props;
    if (prevState.sort_url !== sort_url || prevProps.topic !== this.props.topic)
      this.getArticles(sort_url, topic);
  }

  getArticles = (sort_url, topic) => {
    api.getArticles(sort_url, topic).then((articles) => {
      this.setState({ articles });
    });
  };

  sortComments = (event) => {
    const { value } = event.target;
    this.setState({ sort_url: value });
  };

  render() {
    const { articles, article_url, sort_url } = this.state;
    return (
      <div className="displaypage-container">
        <div className="content">
          <ul className="left-article-list">
            <div className="query-area">
              Sort by:
              <button id="votes" value="votes" onClick={this.sortComments}>
                Votes
              </button>
              <button
                id="created_at"
                value="created_at"
                onClick={this.sortComments}
              >
                Date Created
              </button>
              <button
                id="comment_count"
                value="comment_count"
                onClick={this.sortComments}
              >
                Comments
              </button>
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
                      <div>
                        <p>Posted on: {created_at}</p>
                      </div>
                      <span>
                        {
                          <Link
                            to={`/articles/${article_id}`}
                            onClick={(e) => {
                              this.setState({ article_url: article_id });
                            }}
                          >
                            {title}
                          </Link>
                        }
                      </span>

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
            <Router>
              {this.state.article_url !== "no_article" && (
                <ArticleView path={`:article_id`} />
              )}
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

export default DisplayPage;
