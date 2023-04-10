const userModel = require('../models/userModel');

module.exports = {

    async read (request, response) {
        const usersList = await userModel.find();
        return response.json(usersList);
    },

}


