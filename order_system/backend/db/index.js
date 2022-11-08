const mysql = require("mysql");
const db = mysql.createConnection({
    host: '35.224.10.239',
    user: 'root',
    password: 'Produce101',
    database:'test',
});

module.exports = db;