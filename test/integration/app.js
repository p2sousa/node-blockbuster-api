describe('Routes Movies', () => {
  
  // load model Movies
  const Movies = app.datasource.models.Movies;

  /**
   * default movies to test
   * 
   * @prop {interger} id
   * @prop {String} name
   */
  const defaultMovie = {
    id: 1,
    name: "Default Movie"
  };

  // TODO: use database test
  beforeEach(done => {
    Movies
      .destroy({where: {}})
      .then(() => Movies.create(defaultMovie))
      .then(() => {
        done();
      })
  });

  describe('Route GET /movies', () => {
    it('should return a list of movies', done => {
  
      request
        .get('/movies')
        .end((err, res) => {
          
          expect(res.body[0].id).to.be.eql(defaultMovie.id);
          expect(res.body[0].name).to.be.eql(defaultMovie.name);
          
          done(err);
        });
    });
  });
});