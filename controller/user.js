const user = require('../models/user');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
    try {
        const { name, email, password, mobileNumber, role } = req.body;

        // Check if user already exists
        const existingUser = await user.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        const hpass = await bcrypt.hash(password, 10);

        const newUser = await user.create({
            name,
            email,
            password: hpass,
            mobileNumber,
            role,
        });

        return res.status(201).json({
            message: "User created",
            data: newUser,
        });
    } catch (err) {
        console.error(err.message);

        return res.status(500).json({
            message: "Server error",
        });
    }
};



exports.getUsers = async (req, res) => {
    try {
        const users = await user.find();

        return res.status(200).json({
            message: "Users fetched successfully",
            data: users,
        });
    } catch (err) {
        console.error(err.message);

        return res.status(500).json({
            message: "Server error",
        });
    }
};

// Get User By ID
exports.getUserById = async (req, res) => {
    try {
        const foundUser = await user.findById(req.params.id);

        if (!foundUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "User fetched successfully",
            data: foundUser
        });

    } catch (err) {
        return res.status(500).json({
            message: "Server error"
        });
    }
};


// Update User
exports.updateUser = async (req, res) => {
    try {

        const { name, email, mobileNumber, role } = req.body;

        const updatedUser = await user.findByIdAndUpdate(
            req.params.id,
            {
                name,
                email,
                mobileNumber,
                role
            },
            {
                new: true
            }
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "User updated successfully",
            data: updatedUser
        });

    } catch (err) {
        return res.status(500).json({
            message: "Server error"
        });
    }
};


// Delete User
exports.deleteUser = async (req, res) => {
    try {

        const deletedUser = await user.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(200).json({
            message: "User deleted successfully"
        });

    } catch (err) {
        return res.status(500).json({
            message: "Server error"
        });
    }
};