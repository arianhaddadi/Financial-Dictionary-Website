var express = require("express");
var DatabaseManager = require("../managers/DatabaseManager");
var router = express.Router();

var databaseManager = DatabaseManager.getInstance();

router.post("/", function(req, res, next) {
    const reqBody = req.body;
    databaseManager.deleteWord(reqBody, res);
});

module.exports = router;