import jwt from 'jwt-simple';

describe('Routes UusersMovies', () => {
  const { UsersMovies } = app.datasource.models;
  const { Users } = app.datasource.models;
  const { jwtSecret } = app.config;

  /**
   * default usersMovies to test
   *
   * @prop {interger} user_id
   * @prop {interger} movie_id
   */
  const defaultUserMovie = {
    user_id: 1,
    movie_id: 1,
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
        UsersMovies
          .destroy({ where: {} })
          .then(() => UsersMovies.create(defaultUserMovie))
          .then(() => {
            token = jwt.encode({ id: user.id }, jwtSecret);
            done();
          });
      });
  });

  describe('Route POST /rent/movie', () => {
    it('should create a userMovie', (done) => {
      const newUserMovie = {
        id: 2,
        user_id: 1,
        movie_id: 2,
      };

      request
        .post('/rent/movie')
        .set('Authorization', `bearer ${token}`)
        .send(newUserMovie)
        .end((err, res) => {

          expect(res.body.id).to.be.eql(newUserMovie.id);
          expect(res.body.user_id).to.be.eql(newUserMovie.user_id);
          expect(res.body.movie_id).to.be.eql(newUserMovie.movie_id);

          done(err);
        });
    });
  });

  describe('Route DELETE /rent/movie/{id}', () => {
    it('should delete a userMovie', (done) => {
      request
        .delete('/rent/movie/1')
        .set('Authorization', `bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(204);

          done(err);
        });
    });
  });
});
