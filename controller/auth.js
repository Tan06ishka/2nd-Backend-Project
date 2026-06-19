const jwt = require('jsonwebtoken');
const user = require('../models/user');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body; 
        const existingUser = await user.findOne({ where: { email } });

        if(!existingUser){  
            return res.status(400).json({
                message: "Invalid email or password",
            });
        };
        
        const isMatch = await bcrypt.compare(password, existingUser.password);

        if(!isMatch){
            return res.status(400).json({
                message: "Invalid email or password",
            });
        }

        const token = jwt.sign({ id: existingUser?.id, version: existingUser?.version }, 'Abcde@12345', { expiresIn: '1h' });

        res.status(200).json({
            message: "Login successful",
            token
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error"
        });
    }
};