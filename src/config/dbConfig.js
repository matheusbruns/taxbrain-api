const mongoose = require('mongoose');

const dbConfig = "mongodb+srv://matheusrbruns:8bZbuskWrfBph7cE@cluster0.rhskry5.mongodb.net/taxbrain?retryWrites=true&w=majority";

const connection = mongoose.connect(dbConfig, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = connection;