import React, { Component } from "react";
import * as api from "../api";
import CommentForm from "./forms/CommentForm";

class Comments extends Component {
  state = {
    comments: null,
    body: "",
  };

  componentDidMount() {
    const { article_id } = this.props;
    api.getComments(article_id).then((comments) => {
      this.setState({ comments });
    });
  }

  addNewCommentToState = (newComment) => {
    this.setState(({ comments }) => {
      return { comments: [newComment, ...comments] };
    });
  };

  render() {
    const { comments } = this.state;
    const { article_id, user } = this.props;
    console.log(user, "THIS ONE IS FROM COMMENTS");
    return (
      <div className="Comment-template">
        <h2>Comments</h2>
        <h3> Comment by $User$</h3>
        {user ? (
          <CommentForm
            addNewCommentToState={this.addNewCommentToState}
            article_id={article_id}
            user={user}
          />
        ) : (
          "Log in to comment"
        )}
        {comments
          ? comments.map(({ author, created_at, votes, body, comment_id }) => {
              return (
                <div className="comment-card-holder" key={`${comment_id}`}>
                  <div>
                    <ul>
                      <li>Up</li>
                      <li>{votes}</li>
                      <li>Down</li>
                    </ul>
                  </div>
                  <div className="comment-card-text">
                    <ul>
                      <li>{body}</li>
                      <li>
                        By {author} at {created_at}
                      </li>
                      <li>{author === user && <button>delete</button>}</li>
                    </ul>
                  </div>
                </div>
              );
            })
          : "Loading..."}
      </div>
    );
  }
}
export default Comments;
