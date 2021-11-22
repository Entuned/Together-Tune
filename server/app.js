const path = require('path');
const express = require('express');
const app = express();
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const { clientID, clientSecret } = require('../config/auth.js');

const CLIENT_PATH = path.resolve(__dirname, '../client/dist');

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).send('Not Logged In');
  }
};

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(
  new SpotifyStrategy(
    {
      clientID: clientID,
      clientSecret: clientSecret,
      callbackURL: '/auth/spotify/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

app.use(bodyParser.json());
app.use(express.static(CLIENT_PATH));

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

app.use(passport.initialize());
app.use(passport.session());


app.get('/', isLoggedIn, (req, res)=>{
  res.send(`Hey ${req.user}`);
});
app.get('/auth/error', (req, res) => res.send('Unknown Error'));

app.get('/auth/spotify',
  passport.authenticate('spotify', {
    scope: ['user-read-email', 'user-read-private'],
  }));

app.get('/auth/spotify/callback', passport.authenticate('spotify', { failureRedirect: '/auth/error' }),
  (req, res) => {
    res.redirect('/');
  });


app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});


module.exports = {
  app,
};