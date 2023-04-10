const mongoose = require('mongoose');

const usersDataSchema = new mongoose.Schema({

    email: String,
    password: String,
    name: String,
    admin: Boolean,

});

module.exports = mongoose.model('Users', usersDataSchema);