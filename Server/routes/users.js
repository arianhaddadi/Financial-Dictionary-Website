var express = require("express");
var DatabaseManager = require("../managers/DatabaseManager");
var router = express.Router();

var databaseManager = DatabaseManager.getInstance();

router.post("/login", function(req, res) {
    const reqBody = req.body;
    databaseManager.login(reqBody, res);
});

router.post("/signup", function(req, res) {
    const reqBody = req.body;
    databaseManager.signup(reqBody, res);
});

router.post("/logout", function(req, res) {
    res.clearCookie("token");
    res.status(200).json({status:200, message: "Successfully Logged Out"});
})

module.exports = router;