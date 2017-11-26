const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create the blueprint.
const UserSchema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true,
            match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/},
    nsid: { type: String, required: true, match: /^\d{4}[\s-]\d{4}[\s-]\d{4}$/g },
    age: { type: String, required: true },
    location: { type: String, required: true },
    rank: { type: String, required: true },
    mode: { type: String, required: true },
    weapon: { type: String, required: true },
    status: { type: String, required: true },
})

//Create the model.
const UserModel = mongoose.model('User', UserSchema);

//Export it.
module.exports = UserModel