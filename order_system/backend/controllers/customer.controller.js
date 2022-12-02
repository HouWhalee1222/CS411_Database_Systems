const db = require('../db');

exports.getCustomer = (req, res) => {
    // Select the most popular 10 food
    const sqlCommand = `
    SELECT CustomerId, c.Name, COUNT(*) as ArrivalCount, SUM(OrderCost) AS TotalPrice
    FROM Orders o NATURAL JOIN Customers c NATURAL JOIN
    (SELECT OrderId, SUM(Price) AS OrderCost FROM OrderDishes NATURAL JOIN Dishes GROUP BY OrderId) AS DishPrice
    GROUP BY CustomerId
    ORDER BY ArrivalCount DESC, c.Name
    LIMIT 10;`;

    // console.log(sqlCommand);
    db.query(sqlCommand, (err, result) => {
        // console.log(result);
        res.send(result);
    });
};
