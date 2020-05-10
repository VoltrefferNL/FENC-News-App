import React from "react";
import * as utils from "../../utils";
import { Link } from "@reach/router";
import ErrorMessage from "./ErrorMessage";
import LoadingMessage from "./LoadingMessage";

const ArticleListCard = (props) => {
  const { articles, isLoading, err } = props;
  if (isLoading) return <LoadingMessage />;
  else if (err) return <ErrorMessage err={err} />;
  else
    return articles.map(
      ({
        author,
        title,
        article_id,
        topic,
        created_at,
        votes,
        comment_count,
      }) => {
        const timeFormatter = new Date(created_at).toDateString();

        return (
          <div key={article_id} className="article-list-card">
            <div className="article-list-card-text">
              <div className="article-list-card-border">
                <div>
                  <p className="sublines-text">
                    Posted by {author} on {timeFormatter}
                  </p>
                </div>
                <span>
                  {
                    <Link
                      to={`${article_id}`}
                      className="underlined underlined--thick"
                    >
                      {title}
                    </Link>
                  }
                </span>

                <div className="article-list-card-interactions">
                  <span>
                    <p>Topic: {utils.capitalizeFirstLetter(topic)}</p>
                  </span>
                  <span>
                    <p>Comments: {comment_count}</p>
                  </span>
                  <div>
                    <p>Votes: {votes}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    );
};

export default ArticleListCard;
