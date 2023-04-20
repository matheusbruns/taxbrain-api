const ClientModel = require('../models/ClientModel');
require('dotenv').config();


module.exports = {

    async create(req, res) {
        const { name, email, telephone, cpf } = req.body;
        const userExists = await ClientModel.findOne({ email, cpf });

        if (userExists) {
            res.status(400).json("Cliente já existe!");
        }

        try {
            const client = await ClientModel.create({
                name,
                email,
                telephone,
                cpf
            })
            res.status(201).json(client);
        } catch (error) {
            res.status(400).json(error);
        }
    },

    async read(req, res) {
        try {
            const clients = await ClientModel.find({});
            res.status(200).json(clients);
        } catch (error) {
            res.status(400).json(error);
        }
    }

}