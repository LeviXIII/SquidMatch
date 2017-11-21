const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create the blueprint.
const UserSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    nsId: { type: String, required: true },
    age: { type: Number, required: true },
    location: { type: String, required: true },
    skill: { type: String, required: true },
    playstyle: { type: String, required: true },
    weapon: { type: String, required: true },
    status: { type: String, required: true },
    avatar: { type: String }
})

//Create the model.
const UserModel = mongoose.model('User', UserSchema);

//Export it.
module.exports = UserModel