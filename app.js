import express from 'express';
import config from './config/config';
import datasource from './config/datasource';

const app = express();
app.config = config;
app.datasource = datasource(app);
app.set('port', 9000);

// load model Movies
const Movies = app.datasource.models.Movies

// routes movies
app.route('/movies')
  .get((req, res) => {
    
    // find all movies in database
    Movies
      .findAll({})
        .then(result => res.json(result))
        .catch(err => res.status(412));
  });

export default app;