const express = require("express");
const router = express.Router();
const { login } = require("../controller/auth");
const { loginValidator } = require("../validators/auth");
const validateInput = require("../validators/validateInput");

router.post("/login", loginValidator, validateInput, login);


module.exports = router;