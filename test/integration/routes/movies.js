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
      request
        .get('/movies')
        .set('Authorization', `bearer ${token}`)
        .end((err, res) => {
          expect(res.body[0].id).to.be.eql(defaultMovie.id);
          expect(res.body[0].name).to.be.eql(defaultMovie.name);
          expect(res.body[0].director).to.be.eql(defaultMovie.director);
          expect(res.body[0].quantity).to.be.eql(defaultMovie.quantity);
          expect(res.body[0].rent).to.be.eql(defaultMovie.rent);
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
          expect(res.body.quantity).to.be.eql(defaultMovie.quantity);
          expect(res.body.rent).to.be.eql(defaultMovie.rent);
          expect(res.body.director).to.be.eql(defaultMovie.director);

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
          expect(res.body.quantity).to.be.eql(defaultMovie.quantity);
          expect(res.body.rent).to.be.eql(defaultMovie.rent);
          expect(res.body.director).to.be.eql(defaultMovie.director);

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

      request
        .post('/movies')
        .set('Authorization', `bearer ${token}`)
        .send(newMovie)
        .end((err, res) => {
          expect(res.body.id).to.be.eql(newMovie.id);
          expect(res.body.name).to.be.eql(newMovie.name);
          expect(res.body.quantity).to.be.eql(newMovie.quantity);
          expect(res.body.rent).to.be.eql(newMovie.rent);
          expect(res.body.director).to.be.eql(newMovie.director);

          done(err);
        });
    });
  });

  describe('Route PUT /movies/{id}', () => {
    it('should update a movie', (done) => {
      const updatedMovie = {
        id: 1,
        name: 'Harry Potter',
        director: 'David Yates',
        quantity: 3,
        rent: 1,
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
