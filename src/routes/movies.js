import MoviesController from '../controllers/movies';

export default (app) => {
  const moviesController = new MoviesController(app.datasource.models.Movies);

  // routes movies
  app.route('/movies')
    .all(app.auth.authenticate())
    .get((req, res) => {
      moviesController.getAll()
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .post((req, res) => {
      moviesController.create(req.body)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });

  // route movie
  app.route('/movies/:id')
    .all(app.auth.authenticate())
    .get((req, res) => {
      moviesController.getById(req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    })
    .put((req, res) => {
      moviesController.update(req.body, req.params)
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

  app.route('/movies/title/:name')
    .all(app.auth.authenticate())
    .get((req, res) => {
      moviesController.getByName(req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });

  app.route('/movies/rent')
    .all(app.auth.authenticate())
    .post((req, res) => {
      moviesController.rent(req.body)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });

  app.route('/movies/rent/:id')
    .all(app.auth.authenticate())
    .delete((req, res) => {
      moviesController.giveBack(req.params)
        .then((response) => {
          res.status(response.statusCode);
          res.json(response.data);
        });
    });
};
