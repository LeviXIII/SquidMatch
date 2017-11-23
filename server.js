const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('./models/User');

const config = require('./config.js');

const PORT = 8080; 
const MONGO_CONNECTION_STRING = 'mongodb://localhost:27017/data/db';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(MONGO_CONNECTION_STRING);

const connection = mongoose.connection;
const secretKey = config.token_secretKey;

//Open connections
connection.on('open', () => {
  console.log('Now connected to Mongo ^_^');
  app.listen(PORT, () => {
    console.log('Server now listening on port: '+PORT+' =D');
  })
})

//Function to authorize the user to enter the rest of the site.
// function authorize(req, res, next) {
//   //Get the token from the 'Authorization' header
//   let tokenToValidate = req.headers['authorization'];

//   //Verify the token, using our secret key
//   jwt.verify(tokenToValidate, secretKey, (err, decodedPayload) => {
//       if(err) {
//           //If there was an error, this token is a fraud
//           //We should turn this request away with a 403
//           return res.sendStatus(403);
//       }
//       next();
//   })
// }

app.post('/verify-token', (req, res) => {
  jwt.verify(req.body.currentToken, secretKey, (err, token) => {
    if (err) {
      res.json({
        token: false,
        message: err
      })
    }
    else {
      res.json({
        token: true,
      });
    }
  });
})

app.post('/login', (req, res) => {
  
  const username = req.body.username;
  const passwordGuess = req.body.password;
  
  //Find the password that matches the user.
  User.findOne({ username: username })
  .then(result => {
    //Compare the password against the hashed one.
    bcrypt.compare(passwordGuess, result.password, (err, match) => {
      if (err) {
        return res.status(500);
      }

      if(match) {
          //Generate a JWT and send it back.
          let payload = {
              //Issuer is which server created this token.
              //Save this for when your app is in production.
              /* iss: 'mattlab.com', */ 
              
              //Subject field is what user this is on behalf of.
              sub: username,
              
              //Expiration field says how long this is valid for.
              //Set for an hour.
              exp: Math.floor(Date.now() / 1000) + (60 * 60),
          }

          let token = jwt.sign(payload, secretKey);
          
          return res.json({ token: token });    
      }
      else {
          //If match is false, then we should deny their login
          //request.
          return res.json({ message: "Your account or password is incorrect." });
      } //end if
    })

  })
  .catch(error => {
    res.json({ message: "We couldn't find your account. Please register or try again." });
    console.log(error);
  })
  
}); //app.post

app.post('/register', (req, res) => {
  
  const username = req.body.username;
  const password = req.body.password;

  //Use bcrypt to hash the incoming password
  bcrypt.genSalt(12, (err, salt) => {
    if (err) {
        return res.status(500).json(err);
    }
    
    bcrypt.hash(req.body.password, salt, (error, hashedPassword) => {
      if(error) {
          return res.status(500).json(error);
      }

      //Create a new user and add the user's hashed password
      //as well as their information into the database.
      //Create a user
      User({
        username: req.body.username,
        password: hashedPassword,
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
        //Create a token for the new user.        
        let payload = {
          /* iss: 'mattlab.com', */ 
          sub: username,
          exp: Math.floor(Date.now() / 1000) + (60 * 60),
        }

        let token = jwt.sign(payload, secretKey);

        res.status(200).json({ token: token });
      })
      .catch(error => {
        res.status(500).json({
          error: error,
          signedUp: false
        });
      })
    })
  })
      
}); //end app.post