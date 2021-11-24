/* eslint-disable camelcase */

require('dotenv').config();
const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
const qs = require('qs');
const cookieParser = require('cookie-parser');
const path = require('path');
const CLIENT_PATH = path.resolve(__dirname, '../client/dist');

const client_id = process.env.clientID; // Your client id
const client_secret = process.env.clientSecret; // Your secret
const redirect_uri = 'http://localhost:3000/callback'; // Your redirect uri
// console
/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = function(length) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};


const stateKey = 'spotify_auth_state';

app.use(express.static(CLIENT_PATH));
app.use(cors());
app.use(cookieParser());

app.get('/login', function(req, res) {
  // console.log(res, req);
  // res.send('Log in to Spotify');
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  const scope = 'user-read-private user-read-email playlist-read-private';
  res.redirect('https://accounts.spotify.com/authorize?' +
    qs.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get('/callback', function(req, res) {
  // res.send('Callback');
  // your application requests refresh and access tokens
  // after checking the state parameter
  const code = req.query.code || null;

  axios({
    method: 'POST',
    url: 'https://accounts.spotify.com/api/token',
    data: qs.stringify({
      code: code,
      redirect_uri: redirect_uri,
      grant_type: 'authorization_code'
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
    },
  }) .then((response )=> {
    if (response.status === 200) {
      const access_token = response.data.access_token;
      const refresh_token = response.data.refresh_token;
      // const { access_token } = response.data;
      // console.log(access_token, refresh_token);
      axios.get('https://api.spotify.com/v1/me', {
        headers: {
          'Authorization': 'Bearer ' + access_token
        }
      });
      res.redirect('http://localhost:3000/?' +
      qs.stringify({
        access_token: access_token,
        refresh_token: refresh_token
      }));
    } else {
      res.redirect('/?' +
      qs.stringify({
        error: 'invalid_token'
      }));
    }
  })
    .catch(error => {
      res.send(error);
    });

});

app.get('/refresh_token', function(req, res) {
  // requesting access token from refresh token
  const refresh_token = req.query.refresh_token;
  axios({
    method: 'POST',
    url: 'https://accounts.spotify.com/api/token',
    data: qs.stringify({
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))},
  })
    .then((response) => {
      // console.log(response, 'refresh');
      const access_token = response.data.access_token;
      // console.log(access_token);
      res.send({
        'data': response.data,
        'access_token': access_tokens
      });
    }).catch((err) => console.log('Err3', err));
});


// get all of user's playlist
// I: access token O: JSON
app.get('/playlist', function(req, res) {
  // console.log(req.headers);
  const accessToken = req.headers.accesstoken;
  console.log(accessToken);
  const options = {
    url: 'https://api.spotify.com/v1/me/playlists',
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
  };
  
  axios(options)
    .then(response => {
      // console.log(response.data.items);
      // res.json(response.data.items)
      res.status(200).json(response.data.items);
    })
    // .then(() => {
    //   // res.sendStatus(200);
    // })
    .catch((err) => {
      // console.error(err);
      res.sendStatus(500);
    });
});

// get a specific playlist
// I: access token and playlist id O: json
app.get('/playlist/:playlistID', function(req, res) {
  // console.log(req.params);
  const accessToken = req.headers.accesstoken;

  const playlistID = req.params.playlistID;
  const options = {
    url: `https://api.spotify.com/v1/playlists/${playlistID}?market=US&fields=tracks.items.track`,
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
  };
  
  axios(options)
    .then(response => {
      // console.log(response.data.items);
      // res.json(response.data.items)
      console.log(response.data.tracks);
      res.status(200).json(response.data.tracks);
    })
    // .then(() => {
    //   // res.sendStatus(200);
    // })
    .catch((err) => {
      // console.error(err);
    });
});

module.exports = {
  app,
};













// const path = require('path');
// const express = require('express');
// const app = express();
// const cookieSession = require('cookie-session');
// const bodyParser = require('body-parser');
// const passport = require('passport');
// const SpotifyStrategy = require('passport-spotify').Strategy;
// const { clientID, clientSecret } = require('../config/auth.js');

// const CLIENT_PATH = path.resolve(__dirname, '../client/dist');

// const ensureAuthenticated = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect('/login');
// };

// passport.serializeUser(function (user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function (obj, done) {
//   done(null, obj);
// });

// passport.use(
//   new SpotifyStrategy(
//     {
//       clientID: clientID,
//       clientSecret: clientSecret,
//       callbackURL: 'http://localhost:3000/auth/spotify/callback'
//     },
//     (accessToken, refreshToken, profile, done) => {
//       return done(null, profile);
//     }
//   )
// );

// app.use(bodyParser.json());
// app.use(express.static(CLIENT_PATH));

// app.use(cookieSession({
//   name: 'session',
//   keys: ['key1', 'key2']
// }));

// app.use(passport.initialize());
// app.use(passport.session());

// // app.get('/', (req, res) => {
// //   res.render('index.html', {user: req.user});
// //   // .then((data) => console.log(data));
// // });

// // app.get('/account', ensureAuthenticated, (req, res) => {
// //   console.log('???');
// //   // console.log(req);
// //   res.redirect('/account');
// //   // .then((data) => console.log(data));
// // });

// app.get('/login/success', ensureAuthenticated, (req, res) => {
//   if (req.user) {
//     res.status(200).json({
//       success: true,
//       message: 'successful',
//       user: req.user,
//     });
//   }
// });

// app.get('/login/failed', (req, res) => {
//   res.status(401).json({
//     success: false,
//     message: 'fail',
//   });
// });

// app.get(
//   '/auth/spotify',
//   passport.authenticate('spotify', {
//     scope: ['user-read-email', 'user-read-private'],
//     showDialog: true,
//   })
// );

// app.get(
//   '/auth/spotify/callback',
//   passport.authenticate('spotify', {failureRedirect: '/login/failed'}),
//   function (req, res) {
//     res.redirect('/');
//   }
// );

// app.get('/logout', function (req, res) {
//   req.logout();
//   res.redirect('/');
// });