import React from "react";
import * as api from "../api";
import Comments from "./Comments";

class ArticleView extends React.Component {
  state = {
    article: {},
    comments: {},
  };

  componentDidMount() {
    const { article_url } = this.props;
    api.getSelectedArticle(article_url).then((article) => {
      this.setState({ article });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { article_url } = this.props;
    prevProps.article_url !== article_url &&
      api.getSelectedArticle(article_url).then((article) => {
        this.setState({ article });
      });
  }

  render() {
    const { article_url } = this.props;
    const {
      author,
      body,
      title,
      topic,
      votes,
      created_at,
    } = this.state.article;
    return (
      <div>
        <div className="article-card-holder">
          <div className="article-card-voting">
            <ul>
              <li>Up</li>
              <li>{votes}</li>
              <li>Down</li>
            </ul>
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
        <Comments article_url={article_url} />
      </div>
    );
  }
}
export default ArticleView;
