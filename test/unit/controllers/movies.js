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
});
