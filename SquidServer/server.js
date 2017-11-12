const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.post('/signup', (req, res) => {
    
    //Extract username and password from the body of the post
    //request.
    const username = req.body.username;
    const password = req.body.password;

    //Use bcrypt to hash the new user password.
    bcrypt.genSalt(12, (err, salt) => {
        if(err) {
            return res.status(500).json(err);
        }
        
        bcrypt.hash(password, salt, (err, hashedPassword) => {
            if(err) {
                return res.send(500);
            }
            
            //Store the new username and hashed password in
            //a 'database' (in our case, an array).
            accounts.push({
                username: username,
                password: hashedPassword,
            });
        })
    })

    res.send('You signed up!');

})