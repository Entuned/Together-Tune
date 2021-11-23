const path = require('path');
const express = require('express');
const app = express();
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const { clientID, clientSecret } = require('../config/auth.js');

const CLIENT_PATH = path.resolve(__dirname, '../client/dist');

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
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
      callbackURL: 'http://localhost:3000/auth/spotify/callback'
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

// app.get('/', (req, res) => {
//   res.render('index.html', {user: req.user});
//   // .then((data) => console.log(data));
// });

// app.get('/account', ensureAuthenticated, (req, res) => {
//   console.log('???');
//   // console.log(req);
//   res.redirect('/account');
//   // .then((data) => console.log(data));
// });

app.get('/login/success', ensureAuthenticated, (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: 'successful',
      user: req.user,
    });
  }
});

app.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'fail',
  });
});

app.get(
  '/auth/spotify',
  passport.authenticate('spotify', {
    scope: ['user-read-email', 'user-read-private'],
    showDialog: true,
  })
);

app.get(
  '/auth/spotify/callback',
  passport.authenticate('spotify', {failureRedirect: '/login/failed'}),
  function (req, res) {
    res.redirect('/');
  }
);

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = {
  app,
};

