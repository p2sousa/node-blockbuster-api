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

  getById(params) {
    return this.Movies
      .findOne({ where: params })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message));
  }

  create(data) {
    return this.Movies
      .create(data)
      .then(result => defaultResponse(result, 201))
      .catch(error => errorResponse(error.message, 422));
  }

  update(data, params) {
    return this.Movies
      .update(data, { where: params })
      .then(result => defaultResponse(result))
      .catch(error => errorResponse(error.message, 422));
  }

  delete(params) {
    return this.Movies
      .destroy({ where: params })
      .then(result => defaultResponse(result, 204))
      .catch(error => errorResponse(error.message, 422));
  }
}

export default MoviesController;
