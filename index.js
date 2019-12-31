const express = require('express');
const bodyParser = require('body-parser');

const db = require('./models');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync({ force: false }).then(() => {
  app.listen(8080, () => {
    console.log("Server is running on port 8080")
  });
})