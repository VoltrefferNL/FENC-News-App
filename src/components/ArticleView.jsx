import React from "react";
import * as api from "../api";
import * as utils from "../utils";
import Comments from "./Comments";
import Voter from "./subcomponents/Voter";
import ErrorMessage from "./subcomponents/ErrorMessage";

class ArticleView extends React.Component {
  state = {
    article: {},
    comments: {},
    err: null,
    isLoading: true,
  };

  getArticle = (article_id) => {
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
    const { article_id } = this.props;
    this.getArticle(article_id);
  }

  componentDidUpdate(prevProps, prevState) {
    const { article_id } = this.props;
    prevProps.article_id !== article_id && this.getArticle(article_id);
  }

  render() {
    const { err, isLoading } = this.state;
    const { article_id, user } = this.props;
    const {
      author,
      body,
      title,
      topic,
      votes,
      created_at,
    } = this.state.article;
    return err ? (
      <ErrorMessage err={err} />
    ) : isLoading ? (
      "Loading..."
    ) : (
      <div>
        <div className="article-card-holder">
          <div className="article-card-text">
            <div className="article-card-text-top-row">
              <div className="black">{author}</div>
              <div className="topic-article">
                {utils.capitalizeFirstLetter(topic)}
              </div>
              <div className="date-article">{created_at}</div>
              <div className="date-article">
                <Voter votes={votes} article_id={article_id} />
              </div>
            </div>
            <div className="title-article">
              <span className=" underlined-title">{title}</span>
            </div>
            <div className="body-article">
              <p>{body}</p>
            </div>
          </div>
        </div>
        <Comments article_id={article_id} user={user} />
      </div>
    );
  }
}
export default ArticleView;
