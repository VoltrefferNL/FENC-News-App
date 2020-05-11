import React, { Component } from "react";
import { Router } from "@reach/router";
import * as api from "../api";
import ArticleView from "./ArticleView";
import ChooseArticleView from "./chooseArticleView";
import SortButtonsForArticles from "./buttons/SortButtonsForArticles";
import ArticleListCard from "./cards/ArticleListCard";
import TopicButton from "./buttons/TopicButton";
import Pagination from "./buttons/Pagination";

class DisplayPage extends Component {
  state = {
    isLoading: true,
    articles: [],
    sort_url: "",
    err: null,
    p: 1,
    total_count: null,
  };

  componentDidMount() {
    const { sort_url, p } = this.state;
    const { topic } = this.props;
    this.getArticles(sort_url, topic, p);
  }

  componentDidUpdate(prevProps, prevState) {
    const { sort_url, p } = this.state;
    const { topic } = this.props;
    if (
      prevState.sort_url !== sort_url ||
      prevProps.topic !== topic ||
      prevState.p !== p
    ) {
      this.getArticles(sort_url, topic, p);
    }
  }

  getArticles = (sort_url, topic, p) => {
    api
      .getArticles(sort_url, topic, p)
      .then((data) => {
        this.setState({
          articles: data.articles,
          isLoading: false,
          err: null,
          total_count: data.total_count,
        });
      })
      .catch((err) => {
        this.setState({ isLoading: false, err: err.response.data.msg });
      });
  };

  sortArticles = (event) => {
    const { value } = event.target;
    this.setState({ sort_url: value });
  };

  changePage = (num) => {
    this.setState((currentState) => {
      return { p: currentState.p + num };
    });
  };

  render() {
    const { articles, isLoading, err, sort_url, p, total_count } = this.state;
    const { topic } = this.props;
    return (
      <div className="content">
        <div className="left-article-list">
          <TopicButton topic={topic} />
          <SortButtonsForArticles
            sortArticles={this.sortArticles}
            sort_url={sort_url}
          />
          <ArticleListCard
            articles={articles}
            isLoading={isLoading}
            err={err}
          />
          <Pagination
            p={p}
            total_count={total_count}
            changePage={this.changePage}
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
