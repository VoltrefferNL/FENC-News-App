import React, { Component } from "react";
import * as api from "../../api";

class Voter extends Component {
  state = { userVote: 0 };

  handleUserVote = (voteAdjustment) => {
    const { article_id, comment_id } = this.props;
    console.log(article_id, comment_id);
    this.setState((currentState) => {
      return { userVote: currentState.userVote + voteAdjustment };
    });

    api
      .updateVotes(
        article_id ? article_id : null,
        comment_id ? comment_id : null,
        voteAdjustment
      )
      .catch((error) => {
        this.setState((currentState) => {
          return { userVote: currentState.userVote - voteAdjustment };
        });
      });
  };

  componentDidUpdate(prevProps) {
    const { article_id } = this.props;
    prevProps.article_id !== article_id && this.setState({ userVote: 0 });
  }

  render() {
    const { userVote } = this.state;
    return (
      <div>
        <button
          onClick={() => this.handleUserVote(1)}
          disabled={userVote === 1}
        >
          +1
        </button>
        {this.props.votes + userVote}
        <button
          onClick={() => this.handleUserVote(-1)}
          disabled={userVote === -1}
        >
          -1
        </button>
      </div>
    );
  }
}

export default Voter;
