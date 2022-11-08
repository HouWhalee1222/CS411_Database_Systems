const db = require('../db');

exports.addDish = (req, res) => {
    const OrderId = req.query.OrderId;
    const DishId = req.query.DishId;
    console.log("OrderId:", OrderId, "DishId:", DishId);
    let sqlCommand = `UPDATE OrderDishes\
                        SET Amount = 1 + Amount\
                        WHERE OrderId = ${OrderId} and DishId = ${DishId}`;
    console.log("SQL:", sqlCommand);
    db.query(sqlCommand);

    sqlCommand = `SELECT d.DishId, d.DishName, d.Price, o.Amount, d.Price * o.Amount AS TotalDishPrice, d.ImageUrl\
                    FROM OrderDishes o NATURAL JOIN Dishes d\
                    WHERE o.OrderId = ${OrderId}`;
    db.query(sqlCommand, (err, result) => {
        res.send(result);
    });
};

exports.minusDish = (req, res) => {
    const OrderId = req.query.OrderId;
    const DishId = req.query.DishId;
    const Amount = req.query.Amount;
    console.log("OrderId:", OrderId, "DishId:", DishId, "Amount:", Amount);

    let sqlCommand = "";
    if (Amount > 1) {
        sqlCommand = `UPDATE OrderDishes\
                        SET Amount = Amount - 1\
                        WHERE OrderId = ${OrderId} and DishId = ${DishId}`;
    } else {
        sqlCommand = `DELETE FROM OrderDishes\
                        WHERE OrderId = ${OrderId} and DishId = ${DishId}`;
    }

    console.log("SQL:", sqlCommand);
    db.query(sqlCommand);

    sqlCommand = `SELECT d.DishId, d.DishName, d.Price, o.Amount, d.Price * o.Amount AS TotalDishPrice, d.ImageUrl\
                    FROM OrderDishes o NATURAL JOIN Dishes d\
                    WHERE o.OrderId = ${OrderId}`;
    db.query(sqlCommand, (err, result) => {
        res.send(result);
    });
};

exports.deleteDish = (req, res) => {
    const OrderId = req.query.OrderId;
    const DishId = req.query.DishId;
    console.log("OrderId:", OrderId, "DishId:", DishId);
    let sqlCommand = `DELETE FROM OrderDishes\
                        WHERE OrderId = ${OrderId} and DishId = ${DishId}`;
    console.log("SQL:", sqlCommand);
    db.query(sqlCommand);

    sqlCommand = `SELECT d.DishId, d.DishName, d.Price, o.Amount, d.Price * o.Amount AS TotalDishPrice, d.ImageUrl\
                    FROM OrderDishes o NATURAL JOIN Dishes d\
                    WHERE o.OrderId = ${OrderId}`;
    db.query(sqlCommand, (err, result) => {
        res.send(result);
    });
};

