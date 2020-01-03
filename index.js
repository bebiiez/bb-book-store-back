const express = require('express');
const bodyParser = require('body-parser');
const typeBookService = require('./services/typeBook')
const userService =  require('./services/user')
const cors = require('cors') //npm install cors เพื่อเชื่อมกับหน้าบ้าน

const db = require('./models');
const passport = require('passport')
const app = express();


app.use(passport.initialize())
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./config/passport/passport')
db.sequelize.sync({ alter: true }).then(() => {

  userService(app,db)
  typeBookService(app,db)
  
  
  app.listen(8080, () => {
    console.log("Server is running on port 8080")
  });
})