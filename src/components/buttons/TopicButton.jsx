import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import * as utils from "../../utils";

const SortButtonsForArticles = (props) => {
  const { topic } = props;
  if (topic) {
    return (
      <div className="query-area">
        <button
          id="topic"
          value="active_topic"
          className={"btn btn--border selected"}
        >
          <FontAwesomeIcon icon={faAngleDoubleRight} />
          {utils.capitalizeFirstLetter(topic)}
        </button>
      </div>
    );
  } else {
    return (
      <div className="query-area">
        <button
          id="topic"
          value="active_topic"
          className={"btn btn--border selected"}
        >
          <FontAwesomeIcon icon={faAngleDoubleRight} />
          Please select a topic from the menu bar.
        </button>
      </div>
    );
  }
};

export default SortButtonsForArticles;
