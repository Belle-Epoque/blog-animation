import omdb from "omdb";

// See https://github.com/Belle-Epoque/omdb API.

// Generates your free api key here: http://www.omdbapi.com/apikey.aspx.
const OMDB_API_KEY = "5162a04e";

const OMDB_DEFAULT_OPTIONS = {
  fullPlot: true,
  tomatoes: true
};

const searchMovies = async (searchRequest, apiKey = OMDB_API_KEY) => {
  return new Promise((resolve, reject) => {
    omdb.key(apiKey);
    omdb.search(searchRequest, (err, movies) => {
      if (err) {
        reject(err);
      }

      resolve(movies);
    });
  });
};

const getMovie = async (
  searchRequest,
  options = OMDB_DEFAULT_OPTIONS,
  apiKey = OMDB_API_KEY
) => {
  return new Promise((resolve, reject) => {
    omdb.key(apiKey);
    omdb.get(searchRequest, options, (err, movie) => {
      if (err) {
        reject(err);
      }

      resolve(movie);
    });
  });
};

export { searchMovies, getMovie };
