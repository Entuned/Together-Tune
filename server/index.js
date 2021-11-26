const { app } = require('./app');

const PORT = process.env.PORT || 3000;
const { Users } = require('./database');

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
  // console.log('user', user);
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
































app.listen(PORT, () => {
  console.log(`Server listening on :${PORT}`);
});
