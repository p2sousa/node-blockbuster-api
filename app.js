import express from 'express';
import bodyParser from 'body-parser';
import config from './config/config';
import datasource from './config/datasource';
import moviesRouter from './src/routes/movies';

const app = express();
app.config = config;
app.datasource = datasource(app);
app.set('port', 9000);
app.use(bodyParser.json());

// load model Movies
const { Movies } = app.datasource.models;

moviesRouter(app, Movies);


export default app;
