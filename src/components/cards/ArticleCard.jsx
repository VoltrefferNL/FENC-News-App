import React from "react";
import * as utils from "../../utils";
import Voter from "../buttons/Voter";

const ArticleCard = (props) => {
  const { author, body, title, topic, votes, created_at } = props.article;
  const { article_id } = props;
  console.log(article_id);
  const timeFormatter = new Date(created_at).toDateString();
  return (
    <div className="article-card-holder">
      <div className="article-card-text">
        <div className="article-card-text-top-row">
          <div className="black voter">{author}</div>
          <div className="topic-article voter">
            {utils.capitalizeFirstLetter(topic)}
          </div>
          <div className="date-article voter">{timeFormatter}</div>
          <div className="date-article voter">
            <Voter votes={votes} article_id={article_id} />
          </div>
        </div>
        <div className="title-article">
          <span className=" underlined-title">{title}</span>
        </div>
        <div className="body-article">
          <p>{body}</p>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
