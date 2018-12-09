import express from 'express';
import bodyParser from 'body-parser';
import config from './config/config';
import datasource from './config/datasource';

const app = express();
app.config = config;
app.datasource = datasource(app);
app.set('port', 9000);
app.use(bodyParser.json());

// load model Movies
const { Movies } = app.datasource.models;

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

export default app;
