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
const bodyParser = require('body-parser');
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
app.use(bodyParser.json());
app.get('/login', function(req, res) {
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
      const access_token = response.data.access_token;
      res.send({
        'data': response.data,
        'access_token': access_tokens
      });
    }).catch((err) => console.log('Err3', err));
});


// get all of user's playlist
// I: access token O: JSON
app.get('/playlist', function(req, res) {
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
      res.status(200).json(response.data.items);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});


app.get('/playlist/:playlistID', function(req, res) {
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
      console.log(response.data.tracks);
      res.status(200).json(response.data.tracks);
    })
    .catch((err) => {
    });
});

// get uesr info
app.get('/userInfo', function(req, res) {
  const accessToken = req.headers.accesstoken;
  console.log(req);
  // console.log(req);

  const options = {
    url: 'https://api.spotify.com/v1/me',
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
  };

  axios(options)
    .then(response => {
      // console.log(response.data.tracks);
      // console.log(response.data);
      res.status(200).json(response.data);
    })
    .catch((err) => {
      res.sendStatus(404);
    });
});

module.exports = {
  app,
};
