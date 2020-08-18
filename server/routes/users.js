const express = require("express");
const router = express.Router();
const userLib = require("../lib/users");

router.get("/", userLib.getUserDetails);

module.exports = router;
