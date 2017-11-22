const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/User');

const PORT = 8080; 
const MONGO_CONNECTION_STRING = 'mongodb://localhost:27017/data/db';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(MONGO_CONNECTION_STRING);

const connection = mongoose.connection;

let users = [];

//Open connections
connection.on('open', () => {
  console.log('Now connected to Mongo ^_^');
  app.listen(PORT, () => {
    console.log('Server now listening on port: '+PORT+' =D');
  })
})

app.post('/register', (req, res) => {
  console.log(req.body);
  //Create a user
  User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    nsid: req.body.nsid,
    age: req.body.age,
    location: req.body.location,
    rank: req.body.rank,
    mode: req.body.mode,
    weapon: req.body.weapon,
    status: req.body.status,
    avatar: req.body.avatar,
  })
  .save()
  .then(result => {
    console.log(result);
    res.status(200).json(result);
  })
  .catch(error => {
    console.log("Sorry, we couldn't process your info. Try again later.");
    res.status(500).send("Sorry, we couldn't process your info. Try again later. "+error);
  })
})

