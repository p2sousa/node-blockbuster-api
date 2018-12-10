import jwt from 'jwt-simple';

describe('Routes Movies', () => {
  const { Movies } = app.datasource.models;
  const { Users } = app.datasource.models;
  const { jwtSecret } = app.config;

  /**
   * default movies to test
   *
   * @prop {interger} id
   * @prop {String} name
   */
  const defaultMovie = {
    id: 1,
    name: 'Default Movie',
    director_id: 1,
    quantity: 1,
    available: true,
  };

  let token;

  beforeEach((done) => {
    Users
      .destroy({ where: {} })
      .then(() => Users.create({
        name: 'Floki',
        email: 'floki@mail.com',
        password: '123',
      }))
      .then((user) => {
        Movies
          .destroy({ where: {} })
          .then(() => Movies.create(defaultMovie))
          .then(() => {
            token = jwt.encode({ id: user.id }, jwtSecret);
            done();
          });
      });
  });

  describe('Route GET /movies', () => {
    it('should return a list of movies', (done) => {
      request
        .get('/movies')
        .set('Authorization', `bearer ${token}`)
        .end((err, res) => {
          expect(res.body[0].id).to.be.eql(defaultMovie.id);
          expect(res.body[0].name).to.be.eql(defaultMovie.name);
          expect(res.body[0].director_id).to.be.eql(defaultMovie.director_id);
          expect(res.body[0].available).to.be.eql(defaultMovie.available);

          done(err);
        });
    });
  });

  describe('Route GET /movies/title/{name}', () => {
    it('should return a movie by title', (done) => {
      request
        .get('/movies/title/Default Movie')
        .set('Authorization', `bearer ${token}`)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(defaultMovie.id);
          expect(res.body.name).to.be.eql(defaultMovie.name);
          expect(res.body.director_id).to.be.eql(defaultMovie.director_id);

          done(err);
        });
    });
  });

  describe('Route GET /movies/{id}', () => {
    it('should return a movie', (done) => {
      request
        .get('/movies/1')
        .set('Authorization', `bearer ${token}`)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(defaultMovie.id);
          expect(res.body.name).to.be.eql(defaultMovie.name);
          expect(res.body.director_id).to.be.eql(defaultMovie.director_id);

          done(err);
        });
    });
  });

  describe('Route POST /movies', () => {
    it('should create a movie', (done) => {
      const newMovie = {
        id: 2,
        name: 'Lord of Rings',
        director_id: 1,
        quantity: 1,
        available: true,
      };

      request
        .post('/movies')
        .set('Authorization', `bearer ${token}`)
        .send(newMovie)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(newMovie.id);
          expect(res.body.name).to.be.eql(newMovie.name);
          expect(res.body.director_id).to.be.eql(newMovie.director_id);

          done(err);
        });
    });
  });

  describe('Route PUT /movies/{id}', () => {
    it('should update a movie', (done) => {
      const updatedMovie = {
        id: 1,
        name: 'Harry Potter',
        director_id: 1,
        quantity: 1,
        available: true,
      };

      request
        .put('/movies/1')
        .set('Authorization', `bearer ${token}`)
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
        .set('Authorization', `bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(204);

          done(err);
        });
    });
  });
});
