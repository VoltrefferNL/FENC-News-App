            if (isLoading) {"Loading..."}
                      
          if (err){
            <ErrorMessage err={err} />}
          else {
            <ArticleListCard articles={articles} />}
          
       
       
                 if (isLoading) "Loading..." else if (err) {<ErrorMessage err={err} />}
          else <ArticleListCard articles={articles} />}
       
       
       
       
       
       
       
       
       
       
       <ul className="left-article-list">
          <SortButtons sortComments={this.sortComments} sort_url={sort_url} />
          {isLoading ? (
            "Loading..."
          ) : err ? (
            <ErrorMessage err={err} />
          ) : (
            articles.map(
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
            )
          )}
        </ul>
        <ul className="content-area">
          <Router>
            <ChooseArticleView path="/" />
            <ArticleView path={`:article_id`} user={this.props.user} />
          </Router>
        </ul>