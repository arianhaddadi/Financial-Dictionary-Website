var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var jwt = require("jsonwebtoken");

var wordsSearcher = require("./routes/read");
var updateWords = require("./routes/update");
var deleteWords = require("./routes/delete");
var addWords = require("./routes/create");
var suggestionsRouter = require("./routes/suggestion");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors({origin: true, credentials: true}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/search', wordsSearcher);
app.use("/users", usersRouter);

app.use((req, res, next) => {
  if (req.cookies && req.cookies.token && req.cookies.token.split(" ")[0] === 'STRDCT') {
    jwt.verify(req.cookies.token.split(" ")[1], 'shhhhh', function(err) {
      if (err) {
        res.clearCookie("token");
        res.status(401).json({status: 401, message: "Unauthorized."});
      }
      else {
        next();
      }
    });
  }
  else {
    res.status(401).json({status: 401, message: "Unauthorized."});
  }
})

app.use("/update", updateWords);
app.use("/delete", deleteWords);
app.use("/add", addWords);
app.use("/suggestion", suggestionsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app