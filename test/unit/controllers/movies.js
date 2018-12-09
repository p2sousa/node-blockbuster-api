import MoviesController from '../../../src/controllers/movies';

describe('Controllers: Movies', () => {
  describe('Get all movies: getAll()', () => {
    it('should return a list of movies', () => {
      const Movies = {
        findAll: td.function(),
      };

      const expectedResponse = [{
        id: 1,
        name: 'Harry Potter',
      }];

      td.when(Movies.findAll({})).thenResolve(expectedResponse);

      const moviesController = new MoviesController(Movies);
      return moviesController.getAll()
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Get movie by Id: getById()', () => {
    it('should return a movie', () => {
      const Movies = {
        findOne: td.function(),
      };

      const expectedResponse = {
        id: 1,
        name: 'Harry Potter',
      };

      td.when(Movies.findOne({ where: { id: 1 } })).thenResolve(expectedResponse);

      const moviesController = new MoviesController(Movies);
      return moviesController.getById({ id: 1 })
        .then(response => expect(response.data).to.be.eql(expectedResponse));
    });
  });

  describe('Create a movie: create()', () => {
    it('should create a movie', () => {
      const Movies = {
        create: td.function(),
      };

      const requestBody = {
        name: 'Start Wars',
      };

      const expectedResponse = {
        id: 1,
        name: 'Start Wars',
      };

      td.when(Movies.create(requestBody)).thenResolve(expectedResponse);

      const moviesController = new MoviesController(Movies);
      return moviesController.create(requestBody)
        .then((response) => {
          expect(response.statusCode).to.be.eql(201);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });
  });

  describe('Update a movie: update()', () => {
    it('should update a movie', () => {
      const Movies = {
        update: td.function(),
      };

      const requestBody = {
        id: 1,
        name: 'Harry Potter',
      };

      const expectedResponse = {
        id: 1,
        name: 'Harry Potter',
      };

      td.when(Movies.update(requestBody, { where: { id: 1 } })).thenResolve(expectedResponse);

      const moviesController = new MoviesController(Movies);
      return moviesController.update(requestBody, { id: 1 })
        .then((response) => {
          expect(response.statusCode).to.be.eql(200);
          expect(response.data).to.be.eql(expectedResponse);
        });
    });
  });

  describe('Delete a movie: delete()', () => {
    it('should delete a movie', () => {
      const Movies = {
        destroy: td.function(),
      };

      td.when(Movies.destroy({ where: { id: 1 } })).thenResolve({});

      const moviesController = new MoviesController(Movies);
      return moviesController.delete({ id: 1 })
        .then(response => expect(response.statusCode).to.be.eql(204));
    });
  });
});
