const { app } = require('./app');

const PORT = process.env.PORT || 3000;
const { Users } = require('./database');
// console.log(Users);

// routes go here 
app.get('/messages', (req, res) => {
  // TODO - your code here!
  Users.find()
    .then(users => res.status(200).send(users))
    .catch(err => {
      console.error('Error:', err);
      res.sendStatus(404);
    });
  
});

// input {userName: string, message: string}
app.post('/messages', (req, res) => {
  const user = req.body;
  // console.log(req);
  // console.log(user);
  Users.create(user)
    .then(() => {
      // console.log(req.body);
      console.log(user);
    })
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(404));
});
































app.listen(PORT, () => {
  console.log(`Server listening on :${PORT}`);
});
