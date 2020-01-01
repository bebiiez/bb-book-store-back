const express = require('express');
const bodyParser = require('body-parser');
const typeBookService = require('./services/typeBook')
const cors = require('cors') //npm install cors เพื่อเชื่อมกับหน้าบ้าน

const db = require('./models');
const app = express();

const passport = require('passport')

app.use(passport.initialize())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

db.sequelize.sync({ alter: true }).then(() => {

  typeBookService(app,db)
  
  app.listen(8080, () => {
    console.log("Server is running on port 8080")
  });
})