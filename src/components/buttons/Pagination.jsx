import React from "react";

const Pagination = (props) => {
  const { p, total_count, changePage } = props;
  const maxPage = Math.ceil(total_count / 10);
  return (
    <div className="pagination-row">
      <div className="pagination-button">
        <button
          className={p === 1 ? "btn btn--border selected" : "btn btn--border"}
          disabled={p === 1}
          onClick={() => {
            changePage(-1);
          }}
        >
          {"<"}
        </button>
      </div>
      <div>{`${p} / ${maxPage}`} </div>
      <div className="pagination-button">
        <button
          className={
            p === maxPage ? "btn btn--border selected" : "btn btn--border"
          }
          disabled={p === maxPage}
          onClick={() => {
            changePage(1);
          }}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
