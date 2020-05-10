import React from "react";
import * as api from "../api";
import Comments from "./Comments";
import ErrorMessage from "./messages/ErrorMessage";
import LoadingMessage from "./messages/LoadingMessage";
import ArticleCard from "./cards/ArticleCard";

class ArticleView extends React.Component {
  state = {
    article: {},
    comments: {},
    err: null,
    isLoading: true,
  };

  getArticle = () => {
    const { article_id } = this.props;
    api
      .getSelectedArticle(article_id)
      .then((article) => {
        this.setState({ article, err: null, isLoading: false });
      })
      .catch((err) => {
        this.setState({ err: err.response.data.msg });
      });
  };

  componentDidMount() {
    this.getArticle();
  }

  componentDidUpdate(prevProps, prevState) {
    const { article_id } = this.props;

    if (prevProps.article_id !== article_id) this.getArticle();
  }

  render() {
    const { err, isLoading, article } = this.state;
    const { article_id, user } = this.props;
    if (isLoading) {
      return <LoadingMessage />;
    }
    if (err) {
      return <ErrorMessage err={err} />;
    } else {
      return (
        <div>
          <ArticleCard article={article} article_id={article_id} />
          <Comments article_id={article_id} user={user} />
        </div>
      );
    }
  }
}

export default ArticleView;
