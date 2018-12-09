// defines a response pattern
const defaultResponse = (data, statusCode = 200) => ({
  data,
  statusCode,
});

// defines a response error pattern
const errorResponse = (message, statusCode = 400) => defaultResponse({
  error: message,
}, statusCode);

class MoviesController {
  constructor(Movies) {
    this.Movies = Movies;
  }

  getAll() {
    return this.Movies
      .findAll({})
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }
}

export default MoviesController;
