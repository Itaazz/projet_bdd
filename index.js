const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');
const createTables = require('./database/request/createTables');
const insertData = require('./database/request/insertData');
const crudRoutes = require('./database/crud');

app.use(bodyParser.json());
app.use('/', crudRoutes);

app.listen(3000, function() {
  console.log('Server is running on port 3000');
  connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected to database');
    createTables();
    insertData();
  });
});