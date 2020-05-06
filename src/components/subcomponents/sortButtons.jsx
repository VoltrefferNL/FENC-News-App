import React from "react";

const SortButtons = (props) => {
  const { sortComments } = props;
  return (
    <div className="query-area">
      <button
        id="votes"
        value="votes"
        onClick={sortComments}
        className="btn btn--border"
      >
        Votes
      </button>
      <button
        id="created_at"
        value="created_at"
        onClick={sortComments}
        className="btn btn--border"
      >
        Date Created
      </button>
      <button
        id="comment_count"
        value="comment_count"
        onClick={sortComments}
        className="btn btn--border"
      >
        Comments
      </button>
    </div>
  );
};

export default SortButtons;
