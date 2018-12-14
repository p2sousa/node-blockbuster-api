import express from 'express';
import bodyParser from 'body-parser';
import config from './config/config';
import datasource from './config/datasource';
import moviesRouter from './src/routes/movies';
import usersRouter from './src/routes/users';
import authRouter from './src/routes/auth';
import authorization from './oauth';

const app = express();
app.config = config;
app.datasource = datasource(app);

app.set('port', 9000);
app.use(bodyParser.json());

const auth = authorization(app);
app.use(auth.initialize());
app.auth = auth;

// Routes
authRouter(app);
moviesRouter(app);
usersRouter(app);

export default app;
