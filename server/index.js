const { app } = require('./app');

const PORT = process.env.PORT || 3000;
const { Users } = require('./database');
const { PlaylistDB } = require('./database/playlistSchema');

// routes go here
app.get('/messages', (req, res) => {
  Users.find()
    .then(users => res.status(200).send(users))
    .catch(err => {
      console.error('Error:', err);
      res.sendStatus(404);
    });
});
// 
// app.get('/coupleMessages', (req, res) => {
//   Users.find()
//     .then((data)=>{ 
//       console.log(data);
//       // two fake users to filter by
//       const user1 = 'sbelete01';
//       // const user2 = ''
//       return data; 
//     })
//     .then(users => res.status(200).send(users))
//     .catch(err => {
//       console.error('Error:', err);
//       res.sendStatus(404);
//     });
// });

//post
app.post('/messages', (req, res) => {
  const user = req.body;
  console.log(req.body);
  Users.create(user)
    .then(() => {
      // console.log(user);
    })
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(404));
});

// delete
app.delete('/messages:_id', (req, res) => {
  const { _id } = req.params;

  Users.deleteOne({ _id })
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(404));
});



// create routes to share playlist
app.post('/sharePlaylist', (req, res) => {
  // console.log('hit');
  // console.log(req.body);
  const playlist = req.body;
  // console.log(PlaylistDB);
  // PlaylistDB.create(playlist)
  //   .then(() => {
  //     PlaylistDB.find({})
  //       .then((data) => {
  //         console.log(data);
  //       });
  //   });
  // console.log(req.headers.user);
  const user = req.headers.user;
  PlaylistDB.find({user: user})
    .then((data) => {
      if (!!data.length) {
        PlaylistDB.create(playlist);
      }
    });
});


app.get('/getFriendsPlaylist', (req, res) => {
  // console.log('hit');
  // console.log(req.headers);
  const user = req.headers.user;
  PlaylistDB.find({user: user})
    .then((data) => {
      res.status(200).send(data);
    });
});
































app.listen(PORT, () => {
  console.log(`Server listening on :${PORT}`);
});
