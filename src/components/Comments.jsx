import React, { Component } from "react";
import * as api from "../api";
import CommentForm from "./subcomponents/CommentForm";
import CommentsList from "./subcomponents/CommentsList";
import ErrorMessage from "./subcomponents/ErrorMessage";

class Comments extends Component {
  state = {
    comments: null,
    body: "",
    err: null,
    isLoading: true,
  };

  componentDidMount() {
    const { article_id } = this.props;
    api
      .getComments(article_id)
      .then((comments) => {
        this.setState({ comments, isLoading: false });
      })
      .catch((err) => {
        this.setState({ err: err.response.data.msg });
      });
  }

  addNewCommentToState = (newComment) => {
    this.setState(({ comments }) => {
      return { comments: [newComment, ...comments] };
    });
  };

  deleteComment = (e) => {
    const { value } = e.target;
    api.deleteComment(value).then((response) => {
      this.setState(({ comments }) => {
        return {
          comments: [...comments].filter(
            (item) => item.comment_id !== Number(value)
          ),
        };
      });
    });
  };

  render() {
    const { comments, err, isLoading } = this.state;
    const { article_id, user } = this.props;
    return (
      <div className="comment-template">
        <div>
          {user ? (
            <CommentForm
              addNewCommentToState={this.addNewCommentToState}
              article_id={article_id}
              user={user}
            />
          ) : (
            "Log in to comment"
          )}
        </div>
        {isLoading ? (
          "Loading..."
        ) : err ? (
          <ErrorMessage err={err} />
        ) : (
          comments.map((comment) => {
            return (
              <CommentsList
                key={comment.comment_id}
                comment={comment}
                user={user}
                deleteComment={this.deleteComment}
              />
            );
          })
        )}
      </div>
    );
  }
}
export default Comments;
