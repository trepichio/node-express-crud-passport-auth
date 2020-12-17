const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.js');
const config = require('../config/database.js');
const bcrypt = require('bcryptjs');

module.exports = function (passport) {

  // Local Stategy
  passport.use(new LocalStrategy(
    async function (username, password, done) {
      try {
        let user = await User.findOne({ username });

        if (!user) {
          return done(null, false, { message: 'User not found' });
        }

        if (!await bcrypt.compare(password, user.password)) {
          return done(null, false, { message: 'Wrong password' })
        }

        return done(null, user);
      } catch (error) {
        return done(error)
      }

    }
  ));

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });
}
