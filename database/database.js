const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  database: 'projet_bdd',
  user: 'root',
  password: 'root'
});

module.exports = connection;