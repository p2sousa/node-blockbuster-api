import HttpStatus from 'http-status';
import jwt from 'jwt-simple';

export default (app) => {
  const { config } = app;
  const { Users } = app.datasource.models;

  app.post('/token', (req, res) => {
    if (!(req.body.email && req.body.password)) {
      res.sendStatus(HttpStatus.UNAUTHORIZED);
    }

    const { email } = req.body;
    const { password } = req.body;

    Users.findOne({ where: { email } })
      .then((user) => {
        if (!Users.isPassword(user.password, password)) {
          res.sendStatus(HttpStatus.UNAUTHORIZED);
        }

        const payload = { id: user.id };

        res.json({
          token: jwt.encode(payload, config.jwtSecret),
        });
      })
      .catch(() => res.sendStatus(HttpStatus.UNAUTHORIZED));
  });
};
