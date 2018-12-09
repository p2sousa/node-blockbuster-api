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

  // TODO: use database test
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
      request
        .get('/movies')
        .end((err, res) => {
          expect(res.body[0].id).to.be.eql(defaultMovie.id);
          expect(res.body[0].name).to.be.eql(defaultMovie.name);

          done(err);
        });
    });
  });

  describe('Route GET /movies/{id}', () => {
    it('should return a movie', (done) => {
      request
        .get('/movies/1')
        .end((err, res) => {
          expect(res.body.id).to.be.eql(defaultMovie.id);
          expect(res.body.name).to.be.eql(defaultMovie.name);

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

      request
        .post('/movies')
        .send(newMovie)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(newMovie.id);
          expect(res.body.name).to.be.eql(newMovie.name);

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

      request
        .put('/movies/1')
        .send(updatedMovie)
        .end((err, res) => {
          expect(res.body).to.be.eql([1]);

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
