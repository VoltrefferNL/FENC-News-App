import React, { Component } from "react";
import * as api from "../../api";

class CommentForm extends Component {
  state = {
    user: "happyamy2016",
    body: "",
  };

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ body: value });
  };

  handleCommentSubmit = (e) => {
    const { article_id } = this.props;
    const { user, body } = this.state;
    e.preventDefault();
    console.log(article_id, user, body);
    api
      .postNewComment(article_id, user, body)
      .then((newComment) => {
        console.log(newComment);
        this.props.addNewCommentToState(newComment);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return (
      <form method="post" onSubmit={(e) => this.handleCommentSubmit(e)}>
        <label>Comment:</label>
        <textarea name="body" id="body" onChange={this.handleChange}></textarea>
        <input
          type="submit"
          value="submitNewComment"
          name="submitNewComment"
        ></input>
      </form>
    );
  }
}

export default CommentForm;
