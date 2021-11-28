const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const mongoUri = 'mongodb://ec2-13-58-37-205.us-east-2.compute.amazonaws.com/users';
//hiya
// Create a mongoose connection to out mongo database
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

// Create a mongoose schema for our mongo database
// Declare the shape of the `User` collection in the `Todos` database
const PlaylistSchema = new Schema({
  user: String,
  playlistInfo: Array
}, { timestamps: true });

module.exports = {
  PlaylistDB: model('PlaylistDB', PlaylistSchema),
};