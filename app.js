const mongoose = require('mongoose')
const createServer = require('./util/createServer')


dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}


const app = createServer()
app.listen(3000, async () => {
  await mongoose.connect(process.env.MONGO_URI)

  console.log("Server running on port 3000")
})

module.exports = app;
