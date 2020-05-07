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
      <div>
        <form method="post" onSubmit={this.handleCommentSubmit}>
          <div className="row">
            <div className="col-25">
              <label>Add a comment</label>
            </div>
            <div className="col-75">
              <textarea
                name="body"
                id="body"
                value={this.state.body}
                onChange={this.handleChange}
                required
              ></textarea>
              <input
                type="submit"
                value="Submit Comment"
                name="submitNewComment"
              ></input>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default CommentForm;
