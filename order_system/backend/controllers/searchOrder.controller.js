const db = require('../db');

exports.getOrder = (req, res) => {
    const OrderId = req.query.OrderId;
    console.log("OrderId:", OrderId);
    const sqlCommand = `SELECT d.DishId, d.DishName, d.Price, o.Amount, d.Price * o.Amount AS TotalDishPrice, d.ImageUrl\
                        FROM OrderDishes o NATURAL JOIN Dishes d\
                        WHERE o.OrderId = ${OrderId}`;
    console.log("SQL:", sqlCommand);
    db.query(sqlCommand, (err, result) => {
        res.send(result);
    });

};



