import React, { Component } from "react";
import { Router } from "@reach/router";
import * as api from "../api";
import ArticleView from "./ArticleView";
import ChooseArticleView from "./chooseArticleView";
import SortButtonsForArticles from "./buttons/SortButtonsForArticles";
import ArticleListCard from "./cards/ArticleListCard";

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
    if (prevState.sort_url !== sort_url || prevProps.topic !== topic) {
      this.getArticles(sort_url, topic);
    }
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

  sortArticles = (event) => {
    const { value } = event.target;
    this.setState({ sort_url: value });
  };

  render() {
    const { articles, isLoading, err, sort_url } = this.state;
    return (
      <div className="content">
        <div className="left-article-list">
          <SortButtonsForArticles
            sortArticles={this.sortArticles}
            sort_url={sort_url}
          />
          <ArticleListCard
            articles={articles}
            isLoading={isLoading}
            err={err}
          />
        </div>
        <div className="content-area">
          <Router>
            <ChooseArticleView path="/" />
            <ArticleView path={`:article_id`} user={this.props.user} />
          </Router>
        </div>
      </div>
    );
  }
}

export default DisplayPage;
