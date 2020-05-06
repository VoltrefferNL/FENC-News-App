import React, { Component } from "react";
import { Router, Link } from "@reach/router";
import * as api from "../api";
import * as utils from "../utils";
import ArticleView from "./ArticleView";
import ErrorMessage from "./subcomponents/ErrorMessage";
import ChooseArticleView from "./chooseArticleView";

class DisplayPage extends Component {
  state = {
    isLoading: true,
    articles: [],
    sort_url: "",
    err: null,
  };

  componentDidMount() {
    const { sort_url } = this.state;
    const { topic } = this.props;
    this.getArticles(sort_url, topic);
  }

  componentDidUpdate(prevProps, prevState) {
    const { sort_url } = this.state;
    const { topic } = this.props;
    if (prevState.sort_url !== sort_url || prevProps.topic !== topic)
      this.getArticles(sort_url, topic);
  }

  getArticles = (sort_url, topic) => {
    api
      .getArticles(sort_url, topic)
      .then((articles) => {
        this.setState({ articles, isLoading: false, err: null });
      })
      .catch((err) => {
        this.setState({ isLoading: false, err: err.response.data.msg });
      });
  };

  sortComments = (event) => {
    const { value } = event.target;
    this.setState({ sort_url: value });
  };

  render() {
    const { articles, isLoading, err } = this.state;
    console.log(this.props);
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
            {isLoading ? (
              "Loading..."
            ) : err ? (
              <ErrorMessage err={err} />
            ) : (
              articles.map(
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
                        <span>{<Link to={`${article_id}`}>{title}</Link>}</span>

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
              )
            )}
          </ul>
          <div className="content-area">
            <Router>
              <ChooseArticleView path="/" />
              <ArticleView path={`:article_id`} user={this.props.user} />
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

export default DisplayPage;
