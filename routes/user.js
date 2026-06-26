const express = require('express');
const router = express.Router();

const userController = require('../controller/user');
const { createUserValidator } = require('../validators/user');
const validateInput = require('../validators/validateInput');
const { checkAuth } = require('../middleware/auth');
router.post(
    '/create',
    createUserValidator,
    validateInput,
    userController.createUser
);

router.get(
    '/getUsers',
    checkAuth,
    userController.getUsers
);



router.get(
    '/getUser/:id',
    checkAuth,
    userController.getUserById
);

router.put(
    '/update/:id',
    checkAuth,
    userController.updateUser
);

router.delete(
    '/delete/:id',
    checkAuth,
    userController.deleteUser
);

module.exports = router;