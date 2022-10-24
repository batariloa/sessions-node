const mongoose = require('mongoose')

var createError = require('http-errors');
var express = require('express');
var path = require('path');
const session = require('express-session')
var logger = require('morgan');
require('dotenv').config()

//call our passport config here
require('./config/passport')


const passport = require('passport');
var app = express();


app.use(session({
  resave:false,
  saveUninitialized:false,
  secret: 'some random secret'
}))


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use(passport.initialize())
app.use(passport.session())


//routes
var usersRouter = require('./routes/users');

app.use('/', usersRouter);

// 404 error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// oversimplified error handler
app.use(function(err, req, res, next) {

  res.status(err.status || 500);
  res.send(err.message)
});

dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
app.listen(3000, async ()=>{
await mongoose.connect(process.env.MONGO_URI)

  console.log("Server running on port 3000")
})

module.exports = app;
