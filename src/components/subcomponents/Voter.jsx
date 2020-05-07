import React, { Component } from "react";
import * as api from "../../api";

class Voter extends Component {
  state = { userVote: 0 };

  handleUserVote = (voteAdjustment) => {
    const { article_id, comment_id } = this.props;
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
      <div className="voter-row">
        <div>
          <button
            className="btn btn--border"
            onClick={() => this.handleUserVote(1)}
            disabled={userVote === 1}
          >
            +1
          </button>
        </div>
        <div className="voter-center-votes">{this.props.votes + userVote} </div>
        <div>
          <button
            className="btn btn--border"
            onClick={() => this.handleUserVote(-1)}
            disabled={userVote === -1}
          >
            -1
          </button>
        </div>
      </div>
    );
  }
}

export default Voter;
