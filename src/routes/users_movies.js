import UsersMoviesController from '../controllers/users_movies';

export default (app) => {
  const usersMoviesController = new UsersMoviesController(app.datasource.models.UsersMovies);

  app.route('/rent/movie')
    .all(app.auth.authenticate())
    .post((req, res) => {
      usersMoviesController.create(req.body)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .delete((req, res) => {
      moviesController.delete(req.params)
        .then((response) => {
          res.sendStatus(response.statusCode);
        });
    });
};
