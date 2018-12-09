import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

export default (app) => {
  const { Users } = app.datasource.models;
  const opts = {};
  opts.secretOrKey = app.config.jwtSecret;
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

  const startegy = new Strategy(opts, (payload, done) => {
    Users.findById(payload.id)
      .then((user) => {
        if (!user) {
          return done(null, false);
        }

        return done(null, {
          id: user.id,
          email: user.email,
        });
      })
      .catch(error => done(error, null));
  });

  passport.use(startegy);

  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', app.config.jwtSession),
  };
};
