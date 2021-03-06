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
   * @prop {String} director
   * @prop {interger} quantity
   * @prop {interger} rent
   * @prop {boolean} available
   */
  const defaultMovie = {
    id: 1,
    name: 'Default Movie',
    director: 'Peter Jackson',
    quantity: 3,
    rent: 0,
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
      const moviesList = Joi.array()
        .items(
          Joi.object()
            .keys({
              id: Joi.number(),
              name: Joi.string(),
              director: Joi.string(),
              quantity: Joi.number(),
              rent: Joi.number(),
              available: Joi.boolean(),
            }),
        );

      request
        .get('/movies')
        .set('Authorization', `bearer ${token}`)
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
        director: Joi.string(),
        quantity: Joi.number(),
        rent: Joi.number(),
        available: Joi.boolean(),
      });

      request
        .get('/movies/1')
        .set('Authorization', `bearer ${token}`)
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
        director: 'Peter Jackson',
        quantity: 1,
        rent: 1,
        available: true,
      };

      const movie = Joi.object().keys({
        id: Joi.number(),
        name: Joi.string(),
        director: Joi.string(),
        quantity: Joi.number(),
        rent: Joi.number(),
        available: Joi.boolean(),
      });

      request
        .post('/movies')
        .set('Authorization', `bearer ${token}`)
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
        director: 'Peter',
        quantity: 1,
        rent: 1,
        available: false,
      };

      const updatedCount = Joi.array().items(1);

      request
        .put('/movies/1')
        .set('Authorization', `bearer ${token}`)
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
        .set('Authorization', `bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.eql(204);

          done(err);
        });
    });
  });
});
