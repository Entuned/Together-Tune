/* eslint-disable camelcase */
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const session = require('express-session');
const { clientID, clientSecret } = require('../config/auth.js');

const CLIENT_PATH = path.resolve(__dirname, '../client/dist');
const app = express();

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(
  new SpotifyStrategy(
    {
      // eslint-disable-next-line camelcase
      clientID: clientID,
      clientSecret: clientSecret,
      callbackURL: 'http://localhost:3000/auth/spotify/callback'
    },
    function(accessToken, refreshToken, expires_in, profile, done) {
      User.findOrCreate({ spotifyId: profile.id }, function(err, user) {
        return done(err, user);
      });
    }
  )
);

app.use(bodyParser.json());
app.use(express.static(CLIENT_PATH));
app.use(
  session({secret: clientSecret, resave: true, saveUninitialized: true})
);
app.use(passport.initialize());
app.use(passport.session());

app.get(
  '/auth/spotify',
  passport.authenticate('spotify', {
    scope: ['user-read-email', 'ae']
  })
);

app.get(
  '/auth/spotify/callback',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  }
);

module.exports = {
  app,
};