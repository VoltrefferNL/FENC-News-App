import React, { Component } from "react";
import * as api from "../api";

class Comments extends Component {
  state = {
    comments: [],
  };

  componentDidMount() {
    const { article_url } = this.props;
    api.getComments(article_url).then((comments) => {
      this.setState({ comments });
    });
  }

  render() {
    const { comments } = this.state;

    return comments.map(({ author, created_at, votes, body, comment_id }) => {
      return (
        <div className="comment-card-holder" key={`${comment_id}`}>
          <div>
            <ul>
              <li>Up</li>
              <li>{votes}</li>
              <li>Down</li>
            </ul>
          </div>
          <div>
            <ul>
              <li>{body}</li>
              <li>
                By {author} at {created_at}
              </li>
            </ul>
          </div>
        </div>
      );
    });
  }
}

export default Comments;
