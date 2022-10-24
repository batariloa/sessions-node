
const { default: mongoose } = require('mongoose');
const MongoStore = require('connect-mongo');

dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

const sessionStore =  MongoStore.create({
  mongoUrl: process.env.MONGO_URI,
  mongoOptions: dbOptions
})

module.exports = sessionStore