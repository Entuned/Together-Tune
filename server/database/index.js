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
const UserSchema = new Schema({
  userName: String,
  message: String,
  sentTo: String,
}, { timestamps: true });

module.exports = {
  Users: model('User', UserSchema),
};