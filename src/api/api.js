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

const filterListBy = (arrayToFilter, value, key = "id") => {
  return arrayToFilter.filter(data => {
    // Search specific data in array.
    // toString() allows numeric key. Ex: id "1" and 1.
    return data[key].toString() === value.toString();
  });
};

export const searchMovies = async searchRequest => {
  return await omdb.searchMovies(searchRequest);
};

export const getMovie = async searchRequest => {
  return await omdb.getMovie(searchRequest);
};
