import HttpStatus from 'http-status';

// defines a response pattern
const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
  data,
  statusCode,
});

// defines a response error pattern
const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => defaultResponse({
  error: message,
}, statusCode);

class MoviesController {
  constructor(Movies) {
    this.Movies = Movies;
  }

  // find all movies availables
  getAll() {
    return this.Movies
      .findAll({ where: { available: true } })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  getById(params) {
    return this.Movies
      .findOne({ where: params })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  getByName(params) {
    return this.Movies
      .findOne({ where: params })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  create(data) {
    return this.Movies
      .create(data)
      .then(result => defaultResponse(result, HttpStatus.CREATED))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  update(data, params) {
    return this.Movies
      .update(data, { where: params })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }

  delete(params) {
    return this.Movies
      .destroy({ where: params })
      .then(result => defaultResponse(result, HttpStatus.NO_CONTENT))
      .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
  }
}

export default MoviesController;
