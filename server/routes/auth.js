const express = require("express");
const router = express.Router();
const authLib = require("../lib/auth");

router.post("/signup", authLib.signupUser);
router.post("/login", authLib.loginUser);

module.exports = router;
