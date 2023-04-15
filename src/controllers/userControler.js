const userModel = require('../models/userModel');
const generateToken = require('../utils/generateToken');

module.exports = {

    async create(req, res) {
        const { name, email, password } = req.body;
        const userExists = await userModel.findOne({ email });

        if (userExists) {
            res.status(400).json("Usuário já existe!");
        }

        try {
            const user = await userModel.create({
                name,
                email,
                password,
            })
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json(error);
        }
    },
    async login(req, res) {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            res.status(400).json("Usuário não existe!");
        }

        if (await user.matchPassword(password)) {
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json("E-mail ou senha inválidos!");
        }
    }

}


