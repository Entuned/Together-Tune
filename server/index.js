const { app } = require('./app');
const PORT = process.env.PORT || 3000;
const { Users } = require('./database');

// routes for MESSAGING go here

// returns ALL messages from database
app.get('/messages', (req, res) => {
  Users.find()
    .then(users => res.status(200).send(users))
    .catch(err => {
      console.error('Error:', err);
      res.sendStatus(404);
    });
});

// adds message to database
// check UserSchema for how message object should be formated
app.post('/messages', (req, res) => {
  const user = req.body;
  Users.create(user)
    .then(() => {
      res.status(201).send(user);
    })
    .catch(() => res.sendStatus(404));
});

// deletes messages by mongo generated id (not shown in schema because auto generated)
// currently only used for development purposes
app.delete('/messages:_id', (req, res) => {
  const { _id } = req.params;
  Users.deleteOne({ _id })
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(404));
});


app.listen(PORT, () => {
  console.log(`Server listening on :${PORT}`);
});
