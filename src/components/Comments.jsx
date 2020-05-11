import React, { Component } from "react";
import * as api from "../api";
import CommentForm from "./forms/CommentForm";
import CommentsCard from "./cards/CommentsCard";
import SortButtonsForComments from "./buttons/sortButtonsForComments";

class Comments extends Component {
  state = {
    comments: null,
    body: "",
    err: null,
    isLoading: true,
    sort_url: "",
  };

  componentDidMount() {
    const { sort_url } = this.state;
    this.getComments(sort_url);
  }

  componentDidUpdate(prevProps, prevState) {
    const { article_id } = this.props;
    const { sort_url } = this.state;
    if (prevProps.article_id !== article_id || prevState.sort_url !== sort_url)
      this.getComments(sort_url);
  }

  getComments = (sort_url) => {
    const { article_id } = this.props;
    api
      .getComments(article_id, sort_url)
      .then((comments) => {
        this.setState({ comments, isLoading: false, err: null });
      })
      .catch((err) => {
        this.setState({ err: err.response.data.msg });
      });
  };

  sortComments = (event) => {
    const { value } = event.target;
    this.setState({ sort_url: value });
  };

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
    const { comments, err, isLoading, sort_url } = this.state;
    const { article_id, user } = this.props;
    console.log(article_id);
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
        <div>
          <SortButtonsForComments
            sortArticles={this.sortComments}
            sort_url={sort_url}
          />
        </div>
        <CommentsCard
          comments={comments}
          user={user}
          deleteComment={this.deleteComment}
          isLoading={isLoading}
          err={err}
        />
        )}
      </div>
    );
  }
}
export default Comments;
