const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

var db = mysql.createConnection({
    host: '35.224.10.239',
    user: 'root',
    password: 'Produce101',
    database:'test',
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (require, response) => {
    response.send({'message': 'Hello World'});
});

app.get('/api/search', (require, response) => {
    const foodName = require.query.foodName;
    console.log("Food Name:", foodName);
    const sqlCommand = `SELECT DishId, DishName, Price, Description FROM Dishes WHERE DishName LIKE "%${foodName}%"`;
    console.log("SQL:", sqlCommand);
    db.query(sqlCommand, (err, result) => {
        response.send(result);
    });
});

app.listen(3002, () => {
    console.log("Server is running on port 3002");
});