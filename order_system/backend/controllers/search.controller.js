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


exports.addFood = (req, res) => {
    const orderId = req.query.orderId;
    const dishId = req.query.dishId;
    const amount = 1;
    const sqlCommand = `INSERT INTO OrderDishes VALUES (${orderId},${dishId},${amount})`;
    console.log("SQL:", sqlCommand);
    db.query(sqlCommand, (err, result) => {
        res.send(result);
    });

};

