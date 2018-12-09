import MoviesController from '../controllers/movies';

export default (app, Movies) => {
  // routes movies
  app.route('/movies')
    .get((req, res) => {
      // find all movies in database
      Movies
        .findAll({})
        .then(result => res.json(result))
        .catch(() => res.status(412));
    })
    .post((req, res) => {
      Movies
        .create(req.body)
        .then(result => res.json(result))
        .catch(() => res.status(412));
    });

  // route movie
  app.route('/movies/:id')
    .get((req, res) => {
      // find all movies in database
      Movies
        .findOne({ where: req.params })
        .then(result => res.json(result))
        .catch(() => res.status(412));
    })
    .put((req, res) => {
      Movies
        .update(req.body, { where: req.params })
        .then(result => res.json(result))
        .catch(() => res.status(412));
    })
    .delete((req, res) => {
      Movies
        .destroy({ where: req.params })
        .then(() => res.sendStatus(204))
        .catch(() => res.status(412));
    });
}
