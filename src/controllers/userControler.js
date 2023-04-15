const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcrypt');

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

        if(!email){
            return res.status(422).json({ msg: 'O email é obrigatório'});
        }
        
        if(!password){
            return res.status(422).json({ msg: 'A senha é obrigatória'});
        }

        

        const user = await User.findOne({ email: email });
    
        if (!user) {
            res.status(404).json("Usuário não existe!");
            return;
        }
    
        const isPasswordMatched = await user.matchPassword(password);
        if (isPasswordMatched) {
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


