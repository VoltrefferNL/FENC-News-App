import axios from "axios";
const apiUrl = "https://nc-news-voltreffer.herokuapp.com/api/";

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
