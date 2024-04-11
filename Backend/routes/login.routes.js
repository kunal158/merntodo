const express = require("express");
const router = express.Router();
const { login } = require("../controllers/login.cont.js");

// Login route
router.post("/", login);

module.exports = router;
