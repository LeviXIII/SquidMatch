const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create the blueprint.
const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    nsid: { type: String, required: true },
    age: { type: String, required: true },
    location: { type: String, required: true },
    rank: { type: String, required: true },
    mode: { type: String, required: true },
    weapon: { type: String, required: true },
    status: { type: String, required: true },
    avatar: { type: String }
})

//Create the model.
const UserModel = mongoose.model('User', UserSchema);

//Export it.
module.exports = UserModel