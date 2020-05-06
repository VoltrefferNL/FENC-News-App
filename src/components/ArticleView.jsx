import React from "react";
import * as api from "../api";
import Comments from "./Comments";
import Voter from "./subcomponents/Voter";
import ErrorMessage from "./subcomponents/ErrorMessage";

class ArticleView extends React.Component {
  state = {
    article: {},
    comments: {},
    err: null,
  };

  getArticle = (article_id) => {
    api
      .getSelectedArticle(article_id)
      .then((article) => {
        this.setState({ article, err: null });
      })
      .catch((err) => {
        this.setState({ err: err.response.data.msg });
      });
    console.log(this.state, "Console log > Build up");
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
    const { err } = this.state;
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
    ) : (
      <div>
        <div className="article-card-holder">
          <div className="article-card-voting">
            <Voter votes={votes} article_id={article_id} />
          </div>
          <div className="article-card-text">
            <div>
              <h3>{title}</h3>
            </div>
            <div>
              By {author} in {topic}
            </div>
            <div>{body}</div>
            <div>Posted on {created_at}</div>
          </div>
        </div>
        <Comments article_id={article_id} user={user} />
      </div>
    );
  }
}
export default ArticleView;
