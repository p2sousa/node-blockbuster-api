describe('Routes Movies', () => {
  // load model Movies
  const { Movies } = app.datasource.models;

  /**
   * default movies to test
   *
   * @prop {interger} id
   * @prop {String} name
   */
  const defaultMovie = {
    id: 1,
    name: 'Default Movie',
  };

  beforeEach((done) => {
    Movies
      .destroy({ where: {} })
      .then(() => Movies.create(defaultMovie))
      .then(() => {
        done();
      });
  });

  describe('Route GET /movies', () => {
    it('should return a list of movies', (done) => {
      const moviesList = Joi.array()
        .items(
          Joi.object()
            .keys({
              id: Joi.number(),
              name: Joi.string(),
            }),
        );

      request
        .get('/movies')
        .end((err, res) => {
          joiAssert(res.body, moviesList);
          done(err);
        });
    });
  });

  describe('Route GET /movies/{id}', () => {
    it('should return a movie', (done) => {
      const movie = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
      });

      request
        .get('/movies/1')
        .end((err, res) => {
          joiAssert(res.body, movie);

          done(err);
        });
    });
  });

  describe('Route POST /movies', () => {
    it('should create a movie', (done) => {
      const newMovie = {
        id: 2,
        name: 'Lord of Rings',
      };

      const movie = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
      });

      request
        .post('/movies')
        .send(newMovie)
        .end((err, res) => {
          joiAssert(res.body, movie);
          done(err);
        });
    });
  });

  describe('Route PUT /movies/{id}', () => {
    it('should update a movie', (done) => {
      const updatedMovie = {
        id: 1,
        name: 'Harry Potter',
      };

      const updatedCount = Joi.array().items(1);

      request
        .put('/movies/1')
        .send(updatedMovie)
        .end((err, res) => {
          joiAssert(res.body, updatedCount);

          done(err);
        });
    });
  });

  describe('Route DELETE /movies/{id}', () => {
    it('should delete a movie', (done) => {
      request
        .delete('/movies/1')
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(204);

          done(err);
        });
    });
  });
});
