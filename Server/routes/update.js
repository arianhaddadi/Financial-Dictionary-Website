var express = require("express");
var DatabaseManager = require("../managers/DatabaseManager");
var router = express.Router();

var databaseManager = DatabaseManager.getInstance();

router.post("/", function(req, res) {
    const reqBody = req.body;
    databaseManager.updateWord(reqBody, res);
});

module.exports = router;