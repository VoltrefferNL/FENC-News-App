import axios from "axios";
const apiUrl = "https://nc-news-voltreffer.herokuapp.com/api/";

export const getTopics = () => {
  return axios.get(`${apiUrl}/topics`).then(({ data: { topics } }) => {
    return topics;
  });
};
