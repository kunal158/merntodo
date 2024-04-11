const express = require("express");
const router = express.Router();
const { signup } = require("../controllers/signup.cont.js");

// Signup route
router.post("/", signup);

module.exports = router;
