import mockArticles from "./mockArticles.json";
import mockMovies from "./mockMovies.json";
import * as omdb from "./omdb";

const USE_DISTANT_API = false;
const DEFAULT_TIMEOUT = 200;

/**
 * Get local content with delay.
 *
 * @param {json} content
 * @param {number} timeout
 */
const getContentWithDelay = async (content, timeout = DEFAULT_TIMEOUT) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(content);
    }, timeout);
  });
};

const getContentFromDistantFakeApi = async () => {
  // await response of fetch call (100 fake items)
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  // only proceed once promise is resolved
  const data = await response.json();
  // only proceed once second promise is resolved
  return data;
};

export const getArticles = async (timeout = DEFAULT_TIMEOUT) => {
  // Get articles from external API (caution: no image).
  // See json-server node module to build a more complex fake api.
  if (USE_DISTANT_API) {
    return await getContentFromDistantFakeApi();
  }

  // Get local json with a delay.
  return await getContentWithDelay(mockArticles, timeout);
};

const filterListBy = (arrayToFilter, value, key = "id") => {
  return arrayToFilter.filter(data => {
    // Search specific data in array.
    // toString() allows numeric key. Ex: id "1" and 1.
    return data[key].toString() === value.toString();
  });
};

export const getArticle = async (articleId, timeout = DEFAULT_TIMEOUT) => {
  let res = {};

  // Get articles from external API (caution: no image).
  // See json-server node module to build a more complex fake api.
  if (USE_DISTANT_API) {
    res = await getContentFromDistantFakeApi();
  } else {
    // Get local json with a delay.
    res = await getContentWithDelay(mockArticles, timeout);
  }

  res = filterListBy(res, articleId);

  return res && res.length > 0 ? res[0] : false;
};

export const searchMovies = async searchRequest => {
  return await omdb.searchMovies(searchRequest);
};

export const getMovie = async searchRequest => {
  return await omdb.getMovie(searchRequest);
};
