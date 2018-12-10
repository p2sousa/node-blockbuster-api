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
    });
  
  app.route('/rent/movie/:id')
    .all(app.auth.authenticate())
    .delete((req, res) => {
      usersMoviesController.delete(req.params)
        .then((response) => {
          res.sendStatus(response.statusCode);
        });
    });  
};
