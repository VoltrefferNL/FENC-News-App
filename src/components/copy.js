  addNewComment = (e) => {
    e.preventDefault();
    const { article_id } = this.props;
    const { user, body } = this.state;
    api
      .postNewComment(article_id, user, body)
      .then(({ data: { comment } }) => {
        this.setState(({ comments }) => {
          return { comments: [comment, ...comments] };
        });
      })
      .catch((err) => console.dir(err));
  };

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ body: value });
  };

  render() {
    const { comments } = this.state;
    return (
      <div className="Comment-template">
        <h2>Comments</h2>
        <h3> Comment by $User$</h3>
        <form method="post" onSubmit={(e) => this.addNewComment(e)}>
          <label>Comment:</label>
          <textarea
            name="body"
            id="body"
            onChange={this.handleChange}
          ></textarea>
          <input
            type="submit"
            value="submitNewComment"
            name="submitNewComment"
          ></input>
        </form>