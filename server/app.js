/* eslint-disable camelcase */
require('dotenv').config();
const express = require('express');
const app = express();
const axios = require('axios');
const cors = require('cors');
const qs = require('qs');
const cookieParser = require('cookie-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
const CLIENT_PATH = path.resolve(__dirname, '../client/dist');
const client_id = process.env.clientID; // Your client id
const client_secret = process.env.clientSecret; // Your secret
const redirect_uri = 'http://localhost:3000/callback'; // Your redirect uri

app.use(express.static(CLIENT_PATH));
app.use(cors({ credentials: true }));
app.use(cookieParser());

const authorization = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.sendStatus(403);
  }
  try {
    const data = jwt.verify(token, 'tunes');
    // console.log('REAALTOKEN', data);
    return next();
  } catch (err) {
    res.sendStatus(403);
  }
};

app.get('/login', (req, res) => {
  const scope = 'user-read-private user-read-email playlist-read-private';
  res.redirect('https://accounts.spotify.com/authorize?' +
    qs.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      show_dialog: true
    }));
});


app.get('/protected', authorization, (req, res) => {
  return res.send(req.cookies.access_token);
});

app.get('/logout', authorization, (req, res) => {
  res.clearCookie('access_token').status(200);
  res.redirect('/');
});

app.get('/callback', function(req, res) {
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
      const token = jwt.sign(response.data.access_token, 'tunes');
      res.cookie('access_token', token, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
      });
      const access_token = response.data.access_token;
      const refresh_token = response.data.refresh_token;
      axios.get('https://api.spotify.com/v1/me', {
        headers: {
          'Authorization': 'Bearer ' + access_token
        }
      });
      res.redirect('/');
    }
  })
    .catch(error => {
      res.send(error);
    });

});

app.get('/refresh_token', function(req, res) {
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
        'access_token': access_token
      });
    }).catch((err) => console.log('Err3', err));
});


// get all of user's playlist
// I: access token O: JSON
app.get('/playlist', authorization, (req, res) => {
  const accessToken = jwt.verify(req.headers.accesstoken, 'tunes');
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

// get a specific playlist
// I: access token and playlist id O: json
app.get('/playlist/:playlistID', authorization, (req, res)=> {
  // console.log(req.params);
  const accessToken = jwt.verify(req.headers.accesstoken, 'tunes');
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
      console.error(err);
    });
});

app.get('/me', authorization, (req, res) => {
  const accessToken = jwt.verify(req.headers.accesstoken, 'tunes');
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
      res.status(200).json(response.data);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

module.exports = {
  app,
};
