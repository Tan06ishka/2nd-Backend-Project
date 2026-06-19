const express = require('express');
const router = express.Router();

const userController = require('../controller/user');
const { createUserValidator } = require('../validators/user');
const validateInput = require('../validators/validateInput');

router.post(
    '/create',
    createUserValidator,
    validateInput,
    userController.createUser
);

router.get(
    '/getUsers',
    userController.getUsers
);

module.exports = router;

router.get(
    '/getUser/:id',
    userController.getUserById
);

router.put(
    '/update/:id',
    userController.updateUser
);

router.delete(
    '/delete/:id',
    userController.deleteUser
);