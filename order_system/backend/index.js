const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

var db = mysql.createConnection({
    host: '35.224.10.239',
    user: 'root',
    password: 'Produce101',
    database:'test',
})

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

app.get('/api/search', (require, response) => {
    const foodName = require.body.foodName;
    const sqlCommand = "SELECT DishId, DishName, Price, Description FROM Dishes WHERE DishName LIKE `%?%`";
    db.query(sqlCommand, [foodName], (err, result) => {
        response.send(result);
    })
})

app.listen(3002, () => {
    console.log("running on port 3002");
})