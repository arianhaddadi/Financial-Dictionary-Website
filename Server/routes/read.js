var express = require("express");
var DatabaseManager = require("../managers/DatabaseManager");
var router = express.Router();

var databaseManager = DatabaseManager.getInstance();

router.get("/", function(req, res) {
    const word = req.query.word;
    databaseManager.readWord(word, res);
});

module.exports = router;