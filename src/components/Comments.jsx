import React, { Component } from "react";
import * as api from "../api";

class Comments extends Component {
  state = {
    comments: null,
  };

  componentDidMount() {
    const { article_url } = this.props;
    api.getComments(article_url).then((comments) => {
      this.setState({ comments });
    });
  }

  render() {
    const { comments } = this.state;
    return (  
    
    <div className="Comment-template">
    <h2>Comments</h2>
    <h3> Comment by $User$</h3>
    <form method="post" onSubmit={e => this.addNewComment(e)}><label>Comment:</label><textarea name="body" id="body"></textarea>
          <input type="submit" value="submitNewComment" name="submitNewComment"></input>
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
  : "Loading..." } 
  
  </div>)
}

export default Comments;
