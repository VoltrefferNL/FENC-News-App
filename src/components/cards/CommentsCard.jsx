import React from "react";
import Voter from "../buttons/Voter";
import ErrorMessage from "../messages/ErrorMessage";
import LoadingMessage from "../messages/LoadingMessage";
// import Comments from "../Comments";

const CommentsCard = (props) => {
  const { user, deleteComment, comments, isLoading, err } = props;
  if (isLoading) return <LoadingMessage />;
  if (err) return <ErrorMessage err={err} />;
  else
    return comments.map(({ created_at, comment_id, author, votes, body }) => {
      const timeFormatter = new Date(created_at).toDateString();
      return (
        <div className="comment-card-holder" key={`${comment_id}`}>
          <div className="comment-card-text">
            <div>
              <div className="comment-card-bottom-row">
                <div className="black voter">{author}</div>
                <div className="date-article voter"> {timeFormatter}</div>
                <div className="delete-comment voter">
                  {author === user && (
                    <button
                      className="btn btn--border"
                      value={comment_id}
                      onClick={deleteComment}
                    >
                      Delete
                    </button>
                  )}
                </div>
                <div className="voter">
                  <Voter votes={votes} comment_id={comment_id} />
                </div>
              </div>
              <div className="comment-card-body-row">{body}</div>
            </div>
          </div>
        </div>
      );
    });
};

export default CommentsCard;
