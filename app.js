import express from 'express';
import bodyParser from 'body-parser';
import config from './config/config';
import datasource from './config/datasource';
import moviesRouter from './src/routes/movies';
import usersRouter from './src/routes/users';

const app = express();
app.config = config;
app.datasource = datasource(app);

app.set('port', 9000);
app.use(bodyParser.json());

moviesRouter(app);
usersRouter(app);

export default app;
