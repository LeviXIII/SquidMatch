const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Twit = require('twit');
//const server = require('http').Server(app);

const User = require('./models/User');

const config = require('./config.js');
const T = new Twit(config);

const PORT = process.env.PORT || 8080; 
const MONGO_CONNECTION_STRING = 'mongodb://localhost:27017/data/db';

//Serve out all the static react files
app.use(express.static(__dirname+'/build'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(MONGO_CONNECTION_STRING);

const connection = mongoose.connection;
const secretKey = config.token_secretKey;

const usernames = {};
const rooms = [];

//Open connections
connection.on('open', () => {
  console.log('Now connected to Mongo ^_^');
  
  const server = app.listen(PORT, () => {
    console.log('Server now listening on port: '+PORT+' =D');
  })
  
  const io = require('socket.io').listen(server);

  //Open connection for sockets
  io.sockets.on('connection', socket => {
    
    // //Listen for when a user joins the chat.
    // socket.on('addUser', (username) => {
    //   socket.username = username; //Assign username to the socket.
    //   socket.room = username;      //Assign default room to socket.
    //   socket.join(username);        //Connect the socket to the default room.

    //   socket.emit('client:joinchat', username, socket.room) //Tell the client that they're connected to the chat.
    //   socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', username+' has joined the channel.') //Notify all other sockets that a new user has joined.
    //   socket.emit('updaterooms', rooms, `${socket.room}`) //Update the room list for the client.
    // })

    //Event listener for adding a new room to the list.
    // socket.on('addRoom', room => {
    //   rooms.push(room.roomname) //Add room to array.
    //   socket.leave(socket.room) //Remove user from previous room.
    //   socket.join(room.roomname) //Join new room.
    //   socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username+' has left this room') //Broadcast that user left old room.
    //   socket.room = room.roomname //Assign the room name to the socket.
    //   socket.emit('client:joinchat', socket.username, room.roomname) //Emit to client that they've joined new room.
    //   io.emit('updaterooms', rooms, room.roomname) //Emit to all sockets that there is a new room on the list.
    // })

    //Event listener for switching rooms
    // socket.on('switchRoom', newroom=>{
    //   if(newroom !== socket.room){
    //     socket.leave(socket.room)
    //     socket.join(newroom)
    //     socket.emit('client:joinchat', 'SERVER', newroom)
    //     socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username+' has left this room')
    //     socket.room = newroom
    //     socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username+' has joined this room')
    //     socket.emit('updaterooms', rooms, newroom)
    //   }
    //   else {
    //     socket.emit('client:channelerror', 'SERVER', 'You\'re already in that channel!')
    //   }
    // })
    
    //Event for Sending Messages. Sends the info of the user and message 
    //when sending a message.
    socket.on('sendchat', data => {
      io.sockets.in(socket.room).emit('updatechat', data);
    })
    
    //Event Listener for disconnecting.
    // socket.on('disconnect', ()=>{
    //   delete usernames[socket.username] //Remove the username from our table of usernames.
    //   io.sockets.emit('updateusers', usernames) //Update the userlist on each of our clients.
    //   socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected') //Broadcast that a user has disconnected from the chat.
    //   socket.leave(socket.room) //Remove the socket from the room that they were in last.
    // })

    //Used to cause an update which will send invites out to all group members.
    socket.on('check-invites', () => {
      io.emit('databaseCheck');
    })

    socket.on('make-room-for-user', (username) => {
      //Create the initial room and enter.
      rooms.push(username) //Add room to array.
      socket.join(username) //Join new room.
      socket.room = username //Assign the room name to the socket.

      //Send message back to front end.
      socket.emit('client:user-made-room', username); 
    })

    socket.on('user-declined-request', (data) => {
      //Find the correct room to broadcast to.
      for (let i=0; i < rooms.length; i++) {
        if (rooms[i] === data.from) {
          socket.room = rooms[i];
        }
      }

      //Broadcast to room owner that you declined.
      socket.broadcast.to(socket.room).emit('user-declined', data);
    })

    socket.on('add-user-to-room', (data) => {
      socket.username = data.username; //Assign username to the socket.
      for (let i=0; i < rooms.length; i++) {
        if (rooms[i] === data.from) {
          socket.room = rooms[i];         
          socket.join(rooms[i]);

        }
      }
      socket.to(socket.room).emit('updatechat', {
        sender: 'Admin',
        message: `${data.username} has joined the chat!`
      });
    })

    socket.on('exit-chat', (data) => {

      //Find squad leader's room.
      for (let i=0; i < rooms.length; i++) {
        if (rooms[i] === data.from) {
          socket.room = rooms[i];        
          socket.join(rooms[i]); 
        }
      }

      //Update people in the room.
      socket.to(socket.room).emit('updatechat', 
        { sender: 'Admin',
          message: `${data.username} has swum away.`
        });
      //Remove the socket from the room that they were in last.
      socket.leave(socket.room); 
    })
  })

})

//Search Twitter feed for news on Splatoon 2 from Nintendo.
app.get('/get-tweets', (req, res) => {
  T.get('statuses/user_timeline', { screen_name: '@SplatoonSwitch', count: 20, exclude_replies: true } , function(err, data, resp) {
    if (!err) {
      res.status(200).json({
        dataChunk: data
      });
    }
    else {
      console.log(err);
    }
    
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

app.get('/get-invite-note/:username', (req, res) => {
  User.findOne({ username: req.params.username })
  .then(result => {
    res.json({
      notify: result.notification.notify,
      from: result.notification.from
    });
  })
  .catch(err => {
    console.log('No', error);
  })
})

app.get('/get-user-info/:username', (req, res) => {
  User.findOne({ username: req.params.username })
  .then(result => {
    res.status(200).json({ user: result });
  })
  .catch(error => {
    console.log(error);
  })
})

app.put('/received-invite/:username', (req, res) => {
  User.findOneAndUpdate(
    { username: req.params.username },
    { notification: { notify: false, from: '' }},
    {}
  )
  .then(result => {
    res.json({
      notify: false,
      from: '',
    });
  })
  .catch(err => {
    console.log('No', error);
  })
})

app.put('/update-user-info/:username', (req, res) => {
  User.findOneAndUpdate(
    { username: req.params.username },
    { nsid: req.body.nsid,
      age: req.body.age,
      location: req.body.location,
      rank: req.body.rank,
      mode: req.body.mode,
      weapon: req.body.weapon,
      status: req.body.status,
    },
    {})
    .then(result => {
      res.status(200).json({ oldInfo: result });
    })
    .catch(error => {
      console.log(error);
    })
})

app.put('/update-status/:username', (req, res) => {
  //Puts the person at the back of the queue with respect to time in 
  //search results.
  if (req.body.status === "Available") {
    User.findOneAndUpdate(
      { username: req.params.username },
      { status: req.body.status, time: Date.now() },
      {}
    )
    .then(result => {
      res.status(200).json({ oldInfo: result });
    })
    .catch(error => {
      console.log(error);
    })
  }
  else {
    User.findOneAndUpdate(
      { username: req.params.username },
      { status: req.body.status, time: Date.now() },
      {}
    )
    .then(result => {
      res.status(200).json({ oldInfo: result });
    })
    .catch(error => {
      console.log(error);
    })
  }

})

app.put('/send-invites', (req, res) => {
  
  //Allows for the database to update each field in the array of
  //group members and then return one promise afterwards.
  Promise.all(req.body.group.map((value, i) => {
    return (
      User.findOneAndUpdate(
        { username: value.username },
        { notification: { notify: req.body.notify, from: req.body.from }},
        {}
      )
    )
  }))
  .then(oldData => {
    res.json({});
  })

})

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

app.post('/check-user', (req, res) => {
  User.findOne({ username: req.body.username })
  .then(result => {
    res.json({ result: result });
  })
  .catch(error => {
    console.log(error);
  })
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
          
          return res.json({
            token: token,
            nsid: result.nsid,
            notify: result.notification.notify,
            from: result.notification.from,
            status: "Available"
          });    
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

  // User.findOneAndUpdate(
  //   { username: username },
  //   { status: "Available" },
  //   {}
  // )
  // .then(result => {
  //   res.status(200);
  // })
  // .catch(error => {
  //   console.log(error);
  // })
  
}); //app.post

app.post('/register', (req, res) => {
  
  const username = req.body.username;
  const password = req.body.password;

  //Use bcrypt to hash the incoming password
  bcrypt.genSalt(12, (err, salt) => {
    if (err) {
        return res.status(500).json(err);
    }
    
    bcrypt.hash(password, salt, (error, hashedPassword) => {
      if(error) {
          return res.status(500).json(error);
      }

      //Create a new user and add the user's hashed password
      //as well as their information into the database.
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
        time: Date.now(),
        notification: { notify: false, from: '' }
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

        res.status(200).json({
          token: token,
          id: result._id
        });
      })
      .catch(error => {
        console.log('here!!!', error)
        res.status(500).json({
          error: error,
          signedUp: false
        });
      })
    })
  })
      
}); //end app.post

app.post('/search-criteria', (req, res) => {

  //Build the query object in order to search dynamically.
  let searchQuery = {}
  searchQuery['$and'] = []; //Start an $and query
  searchQuery["$and"].push({ status: req.body.status }); //Always check for status.
  searchQuery["$and"].push({ "notification.notify": req.body.notify });

  //Magic!
  //Check to see which elements in the array match the fields required to search.
  //If they do, add the field to the query.
  //If a value is "any", find all values in the field.
  for (let i=0; i < req.body.searchArray.length; i++) {
    if (/age.*$/ig.test(Object.keys(req.body.searchArray[i]))) {
      if (req.body.searchArray[i][Object.keys(req.body.searchArray[i])] === "Any") {
        searchQuery["$and"].push({ age: {$regex: /^.*$/ } }); //regex searches from start to end for anything.
      }
      else {
        searchQuery["$and"].push({ age: req.body.searchArray[i][Object.keys(req.body.searchArray[i])] });
      }
    }
    if (/location.*$/ig.test(Object.keys(req.body.searchArray[i]))) {
      if (req.body.searchArray[i][Object.keys(req.body.searchArray[i])] === "Any") {
        searchQuery["$and"].push({ location: {$regex: /^.*$/ } });
      }
      else {
        searchQuery["$and"].push({ location: req.body.searchArray[i][Object.keys(req.body.searchArray[i])] });
      }
    }
    if (/rank.*$/ig.test(Object.keys(req.body.searchArray[i]))) {
      if (req.body.searchArray[i][Object.keys(req.body.searchArray[i])] === "Any") {
        searchQuery["$and"].push({ rank: {$regex: /^.*$/ } });
      }
      else {
        searchQuery["$and"].push({ rank: req.body.searchArray[i][Object.keys(req.body.searchArray[i])] });
      }
    }
    if (/mode.*$/ig.test(Object.keys(req.body.searchArray[i]))) {
      if (req.body.searchArray[i][Object.keys(req.body.searchArray[i])] === "Any") {
        searchQuery["$and"].push({ mode: {$regex: /^.*$/ } });
      }
      else {
        searchQuery["$and"].push({ mode: req.body.searchArray[i][Object.keys(req.body.searchArray[i])] });
      }
    }
    if (/weapon.*$/ig.test(Object.keys(req.body.searchArray[i]))) {
      if (req.body.searchArray[i][Object.keys(req.body.searchArray[i])] === "Any") {
        searchQuery["$and"].push({ weapon: {$regex: /^.*$/ } });
      }
      else {
        searchQuery["$and"].push({ weapon: req.body.searchArray[i][Object.keys(req.body.searchArray[i])] });
      }
    }
  }

  //Find the users that match the given criteria by time in the queue.
  User.find(searchQuery).sort({ time: -1 })
  .then(result => {
    res.json({result: result});
  })
  .catch(error => {
    console.log("Couldn't get the users you searched for." + error);
  })
})

app.put('/logout/:username', (req, res) => {
  User.findOneAndUpdate(
    { username: req.params.username },
    { status: req.body.status,
      "notification.notify": req.body.notify,
      "notification.from": req.body.from,
    },
    {}
  )
  .then(result => {
    res.status(200);
    console.log('logged out', result);
  })
  .catch(error => {
    res.status(500);
    console.log("Couldn't log out.", error);
  })
})

app.put('/decline-invite/:username', (req, res) => {
  User.findOneAndUpdate(
    { username: req.params.username },
    { status: req.body.status,
      "notification.notify": req.body.notify,
      "notification.from": req.body.from
    },
    {}
  )
  .then(result => {
    res.status(200).json({ result: result });
  })
  .catch(error => {
    console.log("Couldn't decline invite.", error);
  })
})

//This is to enuser that no matter what endpoint the user attempts to go to, they
//receive our minified react files.
app.get('*', (req, res) => {
  res.sendFile(__dirname+'/build/index.html');
})