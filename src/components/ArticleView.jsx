import React from "react";
import * as api from "../api";
import Comments from "./Comments";

class ArticleView extends React.Component {
  state = {
    article: {},
    comments: {},
  };

  componentDidMount() {
    const { article_id } = this.props;
    api.getSelectedArticle(article_id).then((article) => {
      this.setState({ article });
    });

    api.getComments(article_id).then((comments) => {
      console.log(comments);
      this.setState({ comments });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { article_id } = this.props;
    if (prevProps.article_id !== article_id)
      api.getSelectedArticle(article_id).then((article) => {
        this.setState({ article });
      });
  }

  render() {
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
        <Comments article_id={this.props.article_id} />
      </div>
    );
  }
}
export default ArticleView;
