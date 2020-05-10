import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faClock } from "@fortawesome/free-solid-svg-icons";

const SortButtonsForComments = (props) => {
  const { sortArticles, sort_url } = props;
  return (
    <div className="query-area">
      <button
        id="votes"
        value="votes"
        onClick={sortArticles}
        className={
          sort_url === "votes" ? "btn btn--border selected" : "btn btn--border"
        }
      >
        <FontAwesomeIcon icon={faHeart} /> Votes
      </button>
      <button
        id="created_at"
        value="created_at"
        onClick={sortArticles}
        className={
          sort_url === "created_at"
            ? "btn btn--border selected"
            : "btn btn--border"
        }
      >
        <FontAwesomeIcon icon={faClock} /> Date Created
      </button>
    </div>
  );
};

export default SortButtonsForComments;
