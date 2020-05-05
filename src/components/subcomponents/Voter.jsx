import React, { Component } from "react";
import * as api from "../../api";

class Voter extends Component {
  state = { userVote: 0 };

  handleUserVote = (voteAdjustment) => {
    const { article_id, comment_id } = this.props;
    console.log(article_id, comment_id);

    article_id &&
      api.updateArticleVotes({ article_id, voteAdjustment }).catch((error) => {
        this.setState({ error });
      });

    comment_id &&
      api
        .updateCommentVotes({
          comment_id,
          voteAdjustment,
        })
        .catch((error) => {
          this.setState({ error });
        });

    this.setState((currentState) => {
      return { userVote: currentState.userVote + voteAdjustment };
    });
  };

  render() {
    return (
      <div>
        <button onClick={() => this.handleUserVote(1)}>+1</button>
        {this.props.votes + this.state.userVote}
        <button onClick={() => this.handleUserVote(-1)}>-1</button>
      </div>
    );
  }
}

export default Voter;
