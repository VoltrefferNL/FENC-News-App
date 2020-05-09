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
    const timeFormatter = new Date(created_at).toDateString();
    return err ? (
      <ErrorMessage err={err} />
    ) : isLoading ? (
      "Loading..."
    ) : (
      <div>
        <div className="article-card-holder">
          <div className="article-card-text">
            <div className="article-card-text-top-row">
              <div className="black voter">{author}</div>
              <div className="topic-article voter">
                {utils.capitalizeFirstLetter(topic)}
              </div>
              <div className="date-article voter">{timeFormatter}</div>
              <div className="date-article voter">
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
