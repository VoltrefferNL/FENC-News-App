import React, { Component } from "react";
import * as api from "../../api";

class CommentForm extends Component {
  state = {
    body: "",
  };

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ body: value });
  };

  clear = () => {
    this.setState({ body: "" });
  };

  handleCommentSubmit = (e) => {
    const { article_id, user } = this.props;
    const { body } = this.state;
    e.preventDefault();
    api
      .postNewComment(article_id, user, body)
      .then((newComment) => {
        this.props.addNewCommentToState(newComment);
      })
      .catch((err) => {
        console.log(err);
      });
    this.clear();
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
