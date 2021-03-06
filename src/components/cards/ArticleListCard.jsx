import React from "react";
import * as utils from "../../utils";
import { Link } from "@reach/router";
import ErrorMessage from "../messages/ErrorMessage";
import LoadingMessage from "../messages/LoadingMessage";

const ArticleListCard = (props) => {
  const { articles, isLoading, err } = props;
  if (isLoading) return <LoadingMessage />;
  if (err) return <ErrorMessage err={err} />;
  else
    return (
      <ul>
        {articles.map(
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
              <li key={article_id} className="article-list-card">
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
              </li>
            );
          }
        )}
      </ul>
    );
};

export default ArticleListCard;
