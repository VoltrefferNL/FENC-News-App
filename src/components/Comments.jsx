import React, { Component } from "react";
import * as api from "../api";

class Comments extends Component {
  state = {
    comments: null,
    body: "",
    user: "happyamy2016",
  };

  componentDidMount() {
    const { article_url } = this.props;
    api.getComments(article_url).then((comments) => {
      this.setState({ comments });
    });
  }

  addNewComment = (e) => {
    e.preventDefault();
    const { article_url } = this.props;
    const { user, body } = this.state;
    api
      .postNewComment(article_url, user, body)
      .catch((err) => console.dir(err));
  };

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ body: value });
  };

  render() {
    const { comments } = this.state;
    return (
      <div className="Comment-template">
        <h2>Comments</h2>
        <h3> Comment by $User$</h3>
        <form method="post" onSubmit={(e) => this.addNewComment(e)}>
          <label>Comment:</label>
          <textarea
            name="body"
            id="body"
            onChange={this.handleChange}
          ></textarea>
          <input
            type="submit"
            value="submitNewComment"
            name="submitNewComment"
          ></input>
        </form>

        {this.state.comments
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
            })
          : "Loading..."}
      </div>
    );
  }
}
export default Comments;
