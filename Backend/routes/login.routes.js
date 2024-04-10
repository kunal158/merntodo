const express = require("express");
const router = express.Router();
const { login } = require("../controllers/login.cont.js");

// Login route
router.post("/signin", login);

module.exports = router;
