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
const client_id = 'd8884bef1dc74d43b35d94c52871aeb3'; // Your client id
const client_secret = 'e505c271aca54bf78fb5d8770d19cd8f'; // Your secret
const redirect_uri = 'http://ec2-13-58-37-205.us-east-2.compute.amazonaws.com:3000/callback'; // Your redirect uri
// const redirect_uri = 'http://localhost:3000/callback'; // Your redirect uri

const bodyParser = require('body-parser');

app.use(express.static(CLIENT_PATH));
app.use(cors({ credentials: true }));
app.use(cookieParser());
app.use(bodyParser.json());

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
  const scope = 'user-modify-playback-state user-read-private user-read-email playlist-read-private user-read-playback-state user-modify-playback-state';
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
  const accessToken = jwt.verify(req.cookies.access_token, 'tunes');
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
      // console.log(response.data, 'playlist');
      res.status(200).json(response.data.items);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

// get a specific playlist
// I: access token and playlist id O: json
app.get('/playlist/:playlistID', authorization, (req, res)=> {
  const accessToken = jwt.verify(req.cookies.access_token, 'tunes');
  const playlistID = req.params.playlistID;
  const options = {
    url: `https://api.spotify.com/v1/playlists/${playlistID}/tracks`,

    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
  };

  axios(options)
    .then(({ data })=> {
      // console.log(data, 'PLAYID');
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get('/me', authorization, (req, res) => {
  const accessToken = jwt.verify(req.cookies.access_token, 'tunes');
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

// get uesr info
app.get('/userInfo', authorization, function(req, res) {
  // const accessToken = req.headers.accesstoken;
  // console.log(req);
  // console.log(req);
  const accessToken = jwt.verify(req.cookies.access_token, 'tunes');
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

app.get('/devices', authorization, (req, res) => {
  const accessToken = jwt.verify(req.cookies.access_token, 'tunes');
  // const accessToken = req.headers.accesstoken;
  console.log('this is the accesstoken ', accessToken);
  const options = {
    url: 'https://api.spotify.com/v1/me/player/devices',
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
  };

  // console.log(options);
  axios(options)
    .then((response) => {
      console.log(response.data, 'device');
      res.status(200).json(response.data);
    }).catch((err) => 
      res.sendStatus(500));
});



/// play a specific album
// get a specific playlist
// I: access token and playlist id O: json
app.put('/play', (req, res)=> {
  const accessToken = jwt.verify(req.cookies.access_token, 'tunes');
  const reqBody = req.body;
  const options = {
    url: 'https://api.spotify.com/v1/me/player/play',
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    data: reqBody
  };

  axios(options)
    .then(()=> {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error('PUT ERR', err);
    });
});

app.put('/pause', (req, res)=> {
  const accessToken = jwt.verify(req.cookies.access_token, 'tunes');
  const options = {
    url: 'https://api.spotify.com/v1/me/player/pause',
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
  };
  axios(options)
    .then(()=> {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.error(err);
    });
});


module.exports = {
  app,
};
