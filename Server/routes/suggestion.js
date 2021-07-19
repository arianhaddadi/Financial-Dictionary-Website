var express = require("express");
var DatabaseManager = require("../managers/DatabaseManager");
var router = express.Router();

var databaseManager = DatabaseManager.getInstance();

router.post("/", function(req, res, next) {
    const reqBody = req.body;
    databaseManager.addSuggestion(reqBody, res);
});


router.get("/", function(req, res, next) {
    databaseManager.getSuggestions(res);
});

router.put("/", function(req, res, next) {
    const reqBody = req.body;
    databaseManager.convertSuggestToWords(reqBody, res);
});

router.delete("/", function(req, res, next) {
    const word = req.query.word;
    databaseManager.deleteSuggestion(word, res);
});



module.exports = router;