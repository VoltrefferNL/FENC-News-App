import React, { Component } from "react";
import * as api from "../api";
import CommentForm from "./subcomponents/CommentForm";
import Voter from "./subcomponents/Voter";
import ErrorMessage from "./subcomponents/ErrorMessage";

class Comments extends Component {
  state = {
    comments: null,
    body: "",
    err: null,
  };

  componentDidMount() {
    const { article_id } = this.props;
    api
      .getComments(article_id)
      .then((comments) => {
        this.setState({ comments });
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
    const { comments, err } = this.state;
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

        {err ? (
          <ErrorMessage err={err} />
        ) : comments ? (
          comments.map(({ author, created_at, votes, body, comment_id }) => {
            const timeFormatter = new Date(created_at).toDateString();
            return (
              <div className="comment-card-holder" key={`${comment_id}`}>
                <div className="comment-card-text">
                  <div>
                    <div className="comment-card-bottom-row">
                      <div className="black voter">{author}</div>
                      <div className="date-article voter"> {timeFormatter}</div>
                      <div className="delete-comment voter">
                        {author === user && (
                          <button
                            className="btn btn--border"
                            value={comment_id}
                            onClick={this.deleteComment}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                      <div className="voter">
                        <Voter votes={votes} comment_id={comment_id} />
                      </div>
                    </div>
                    <div className="comment-card-body-row">{body}</div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          "Loading..."
        )}
      </div>
    );
  }
}
export default Comments;
