import React, { Component } from "react";
import { Router, Link } from "@reach/router";
import * as api from "../api";
import * as utils from "../utils";
import ArticleView from "./ArticleView";
import ErrorMessage from "./subcomponents/ErrorMessage";
import ChooseArticleView from "./chooseArticleView";
import SortButtons from "./subcomponents/sortButtons";

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
    return (
      <div className="content">
        <ul className="left-article-list">
          <SortButtons sortComments={this.sortComments} />
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
                const timeFormatter = new Date(created_at).toDateString();
                return (
                  <li key={article_id} className="article-list-card">
                    <div className="article-list-card-text">
                      <div className="article-list-card-border">
                        <div>
                          <p className="sublines-text">
                            Posted on: {timeFormatter}
                          </p>
                        </div>
                        <span>
                          {
                            <Link
                              to={`${article_id}`}
                              className="underlined underlined--thick"
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
                    </div>
                  </li>
                );
              }
            )
          )}
        </ul>
        <ul className="content-area">
          <Router>
            <ChooseArticleView path="/" />
            <ArticleView path={`:article_id`} user={this.props.user} />
          </Router>
        </ul>
      </div>
    );
  }
}

export default DisplayPage;
