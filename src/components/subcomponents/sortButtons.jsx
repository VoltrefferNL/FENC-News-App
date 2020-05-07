import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComments,
  faHeart,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

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
        <FontAwesomeIcon icon={faHeart} /> Votes
      </button>
      <button
        id="created_at"
        value="created_at"
        onClick={sortComments}
        className="btn btn--border"
      >
        <FontAwesomeIcon icon={faClock} /> Date Created
      </button>
      <button
        id="comment_count"
        value="comment_count"
        onClick={sortComments}
        className="btn btn--border"
      >
        <FontAwesomeIcon icon={faComments} /> Comments
      </button>
    </div>
  );
};

export default SortButtons;
