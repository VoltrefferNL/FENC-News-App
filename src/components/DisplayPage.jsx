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
    api.getArticles().then((articles) => {
      this.setState({ articles });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.sort_url !== this.state.sort_url) {
      const { sort_url } = this.state;
      const { topic } = this.props;
      api.getArticles(sort_url, topic).then((articles) => {
        this.setState({ articles });
      });
    } else if (prevProps.topic !== this.props.topic) {
      const { sort_url } = this.state;
      const { topic } = this.props;
      api.getArticles(sort_url, topic).then((articles) => {
        this.setState({ articles });
      });
    }
  }

  render() {
    const { articles, article_url, sort_url } = this.state;
    console.log(this.state);
    console.log(this.props.topic, "DISPLAY");

    return (
      <div className="displaypage-container">
        <div className="content">
          <ul className="left-article-list">
            <div className="query-area">
              Sort by:
              <Link
                to={`/articles/votes/${article_url}`}
                onClick={(e) => {
                  console.log(e);
                  this.setState({ sort_url: "votes" });
                }}
              >
                Votes
              </Link>
              <Link
                to={`/articles/created_at/${article_url}`}
                onClick={(e) => {
                  this.setState({ sort_url: "created_at" });
                }}
              >
                Date Created
              </Link>
              <Link
                to={`/articles/comment_count/${article_url}`}
                onClick={(e) => {
                  this.setState({ sort_url: "comment_count" });
                }}
              >
                Comments
              </Link>
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
                            to={`/articles/${sort_url}/${article_id}`}
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
            <Router className="Hello?">
              {this.state.article_url !== "no_article" && (
                <ArticleView
                  path={`/${sort_url}/${article_url}`}
                  article_url={article_url}
                />
              )}
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

export default DisplayPage;
