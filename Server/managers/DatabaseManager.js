var mysql = require("mysql");
var jwt = require("jsonwebtoken"); 

class DatabaseManager {
    static instance = null;

    constructor() {
        this.pool = mysql.createPool({
            connectionLimit:50,
            host: "37.152.180.96",
            user: "root",
            password: "stellardict",
            database: "stellar"
        });
    }

    static getInstance = () => {
        if (DatabaseManager.instance === null) {
            DatabaseManager.instance = new DatabaseManager();
        }
        return DatabaseManager.instance;
    }

    prepareResponse = (status, data, error) => {
        return {
            status:status,
            data:data,
            message:error ? "Error" : "Success"
        }
    }

    convertWordsRowsToObjects = (rows) => {
        const alreadyAdded = {};
        const words = [];
        let word;
        for(let i = 0; i < rows.length; i++) {
            word = rows[i];
            if (alreadyAdded[word.english] === undefined) {
                words.push({
                    english:word.english,
                    persian:word.persian
                })
                alreadyAdded[word.english] = 1;
            }
        }
        return words;
    }

    convertSuggestionsRowsToObjects = (rows) => {
        const words = [];
        let word;
        for(let i = 0; i < rows.length; i++) {
            word = rows[i];
            words.push({
                english: word.english,
                persian: word.persian,
                email: word.email
            });
        }
        return words;
    }

    signup = (body, res) => {
        const self = this;
        this.pool.getConnection((error, connection) => {
            if (error) {
                connection.release();
                res.json(self.prepareResponse(100, undefined, true));
                return;
            }

            connection.query(`SELECT * FROM USERS u WHERE u.username='${body.username}'`, 
                (error, rows) => {

                    if(error) {
                        connection.release();
                        console.log(error);
                        res.json(self.prepareResponse(100, undefined, true));
                    }
                    else {
                        if (rows.length == 0) {
                            connection.query(`INSERT INTO USERS(username, password) VALUES ('${body.username.trim()}', '${body.password.trim()}');`,
                                (error) => {
                                    connection.release();

                                    if (error) {
                                        res.json(self.prepareResponse(100, undefined, true));
                                        console.log(error);
                                    }

                                    else {
                                        res.json(self.prepareResponse(200, undefined, false));
                                    }
                                }
                            );
                        }
                        else {
                            res.json(self.prepareResponse(409, undefined, true));
                        }
                    }
                }
            )
        })
    }

    createToken = (user) => {
        const token = jwt.sign({username: user.username, password: user.password}, "shhhhh", {expiresIn: "24h"});
        return token;
    }

    login = (body, res) => {
        const self = this;
        this.pool.getConnection((error, connection) => {
            if (error) {
                connection.release();
                res.json(self.prepareResponse(100, undefined, true));
                return;
            }

            connection.query(`SELECT * FROM USERS u WHERE u.username='${body.username.trim()}' AND u.password='${body.password.trim()}'`, 
                (error, rows) => {

                    if(error) {
                        connection.release();
                        console.log(error);
                        res.json(self.prepareResponse(100, undefined, true));
                    }

                    else {
                        connection.release();

                        if (rows.length == 0) {
                            res.json(self.prepareResponse(100, undefined, true));
                        }
                        else {
                            res.cookie("token", `STRDCT ${self.createToken(rows[0])}`, {expires: new Date(Date.now() + 86400000)});
                            res.json(self.prepareResponse(200, undefined, false));
                        }
                    }
                }
            )
        })
    }

    getSuggestions = (res) => {
        const self = this;
        this.pool.getConnection((error, connection) => {
            if (error) {
                connection.release();
                res.json(self.prepareResponse(100, undefined, true));
                return;
            }

            connection.query(`SELECT * FROM SUGGESTIONS`, 
                (error, rows) => {
                    connection.release();

                    if(error) {
                        console.log(error);
                        res.json(self.prepareResponse(100, undefined, true));
                    }

                    else {
                        res.json(self.prepareResponse(200, self.convertSuggestionsRowsToObjects(rows), false));
                    }
                }
            )
        })
    }

    deleteSuggestion = (word, res) => {
        const self = this;
        this.pool.getConnection((error, connection) => {
            if (error) {
                connection.release();
                res.json(self.prepareResponse(100, undefined, true));
                return;
            }
            connection.query(`DELETE FROM SUGGESTIONS s WHERE s.english = '${word.trim()}'`, 
                (error) => {
                    connection.release();

                    if(error) {
                        console.log(error);
                        res.json(self.prepareResponse(100, undefined, true));
                    }

                    else {
                        res.json(self.prepareResponse(200, undefined, false));
                    }
                }
            );
        })
    }


    convertSuggestToWords = (obj, res) => {
        const self = this;
        this.pool.getConnection((error, connection) => {
            if (error) {
                connection.release();
                res.json(self.prepareResponse(100, undefined, true));
                return;
            }

            connection.query(`DELETE FROM SUGGESTIONS s WHERE s.english = '${obj.english.trim()}'`, 
                (error) => {
                    
                    if(error) {
                        connection.release();
                        console.log(error);
                        res.json(self.prepareResponse(100, undefined, true));
                    }

                    else {
                        connection.query(`INSERT INTO WORDS(english, persian) VALUES ('${obj.english.trim()}', '${obj.persian.trim()}');`, 
                            (error) => {
                                connection.release();

                                if(error) {
                                    console.log(error);
                                    res.json(self.prepareResponse(100, undefined, true));
                                }

                                else {
                                    res.json(self.prepareResponse(200, undefined, false));
                                }
                            }
                        )
                    }
                }
            )
        })
    }

    addSuggestion = (obj, res) => {
        const self = this;
        this.pool.getConnection((error, connection) => {
            if (error) {
                connection.release();
                res.json(self.prepareResponse(100, undefined, true));
                return;
            }

            connection.query(`SELECT * FROM WORDS w WHERE w.english = '${obj.english.trim()}';`, 
                (error, rows) => {
                    
                    if(error || rows.length !== 0) {
                        connection.release();
                        console.log(error);
                        res.json(self.prepareResponse(100, undefined, true));
                    }

                    else {
                        connection.query(`INSERT INTO SUGGESTIONS(english, persian, email) VALUES ('${obj.english.trim()}', '${obj.persian.trim()}', '${obj.email.trim()}');`, 
                            (error) => {
                                connection.release();
            
                                if(error) {
                                    console.log(error);
                                    res.json(self.prepareResponse(100, undefined, true));
                                }
            
                                else {
                                    res.json(self.prepareResponse(200, undefined, false));
                                }
                            }
                        )
                    }
                }
            )
        })
    }

    createWord = (obj, res) => {
        const self = this;
        this.pool.getConnection((error, connection) => {
            if (error) {
                connection.release();
                res.json(self.prepareResponse(100, undefined, true));
                return;
            }

            connection.query(`INSERT INTO WORDS(english, persian) VALUES ('${obj.english.trim()}', '${obj.persian.trim()}');`, 
                (error) => {
                    connection.release();

                    if(error) {
                        console.log(error);
                        res.json(self.prepareResponse(100, undefined, true));
                    }

                    else {
                        res.json(self.prepareResponse(200, undefined, false));
                    }
                }
            )
        })
    }

    readWord = (word, res) => {
        const self = this;
        this.pool.getConnection((error, connection) => {
            if (error) {
                connection.release();
                res.json(self.prepareResponse(100, undefined, true));
                return;
            }

            if (word.match(/^[a-zA-Z\s]*$/)) {
                let result = [];
                connection.query(`SELECT * FROM WORDS w WHERE w.english = '${word.trim()}' OR w.english LIKE '${word.trim()} %' OR w.english LIKE '% ${word.trim()}' OR w.english LIKE '% ${word.trim()} %' ORDER BY CHAR_LENGTH(w.english); `, 
                    (error, rows) => {
                        
                        if(error) {
                            connection.release();
                            res.json(self.prepareResponse(100, undefined, true));
                        }
                        
                        else {  
                            result.push(...rows); 
                            connection.query(`SELECT * FROM WORDS w WHERE w.english LIKE '%${word.trim()}%'`, 
                                (error, rows) => {
                                    connection.release();
                                
                                    if(error) {
                                        res.json(self.prepareResponse(100, undefined, true));
                                    }
                                    
                                    else {  
                                        result.push(...rows); 
                                        res.json(self.prepareResponse(200, self.convertWordsRowsToObjects(result), false));
                                    }
                                })
                        }
                    })
            }
            else {
                connection.query(`SELECT * FROM WORDS w WHERE w.persian LIKE '%${word.trim()}%' ORDER BY CHAR_LENGTH(w.persian); `, 
                    (error, rows) => {
                        connection.release();
                    
                        if(error) {
                            res.json(self.prepareResponse(100, undefined, true));
                        }
                        
                        else {  
                            res.json(self.prepareResponse(200, self.convertWordsRowsToObjects(rows), false));
                        }
                    })
            }
        })
    }

    updateWord = (obj, res) => {
        const self = this;
        this.pool.getConnection((error, connection) => {
            if (error) {
                connection.release();
                res.json(self.prepareResponse(100, undefined, true));
                return;
            }

            connection.query(`UPDATE WORDS w SET w.english = '${obj.english.trim()}' , w.persian = '${obj.persian.trim()}' WHERE w.english = '${obj.oldEnglish.trim()}' ;`, 
                (error) => {
                    connection.release();

                    if(error) {
                        console.log(error);
                        res.json(self.prepareResponse(100, undefined, true));
                    }

                    else {
                        res.json(self.prepareResponse(200, undefined, false));
                    }
                }
            )
        })
    }

    deleteWord = (obj, res) => {
        const self = this;
        this.pool.getConnection((error, connection) => {
            if (error) {
                connection.release();
                res.json(self.prepareResponse(100, undefined, true));
                return;
            }

            connection.query(`DELETE FROM WORDS w WHERE w.english = "${obj.english.trim()}" OR w.persian = "${obj.persian.trim()}";`, 
                (error) => {
                    connection.release();

                    if(error) {
                        res.json(self.prepareResponse(100, undefined, true));
                    }
                    else {
                        res.json(self.prepareResponse(200, undefined, false));
                    }
                })
        })
    }

}

module.exports = DatabaseManager;