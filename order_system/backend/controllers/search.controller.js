const db = require('../db');

exports.getFood = (req, res) => {
    const foodName = req.query.foodName;
    console.log("Food Name:", foodName);
    const sqlCommand = `SELECT DishId, DishName, Price, Description FROM Dishes WHERE DishName LIKE "%${foodName}%"`;
    console.log("SQL:", sqlCommand);
    db.query(sqlCommand, (err, result) => {
        res.send(result);
    });

};


