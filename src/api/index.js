import axios from "axios";
const apiUrl = "https://nc-news-voltreffer.herokuapp.com/api";

export const getTopics = () => {
  return axios.get(`${apiUrl}/topics`).then(({ data: { topics } }) => {
    return topics;
  });
};

export const getArticles = (sort_by, topic) => {
  return axios
    .get(`${apiUrl}/articles`, { params: { sort_by, topic } })
    .then(({ data: { articles } }) => {
      return articles;
    });
};

export const getSelectedArticle = (article_id) => {
  return axios
    .get(`${apiUrl}/articles/${article_id}`)
    .then(({ data: { article } }) => {
      return article;
    });
};

export const getComments = (article_id) => {
  return axios
    .get(`${apiUrl}/articles/${article_id}/comments`)
    .then(({ data: { comments } }) => {
      return comments;
    });
};

export const postNewComment = (article_id, userName, body) => {
  return axios
    .post(`${apiUrl}/articles/${article_id}/comments`, {
      username: userName,
      body,
    })
    .then(({ data: { comment } }) => {
      return comment;
    });
};

export const deleteComment = (comment_id) => {
  return axios.delete(`${apiUrl}/comments/${comment_id}`).then((response) => {
    return response;
  });
};

export const updateVotes = (article_id, comment_id, voteAdjustment) => {
  if (article_id) {
    return axios
      .patch(`${apiUrl}/articles/${article_id}`, {
        inc_votes: voteAdjustment,
      })
      .then(({ data: { article } }) => {
        return article;
      });
  } else if (comment_id) {
    return axios
      .patch(`${apiUrl}/comments/${comment_id}`, {
        inc_votes: voteAdjustment,
      })
      .then(({ data: { comment } }) => {
        return comment;
      });
  }
};
