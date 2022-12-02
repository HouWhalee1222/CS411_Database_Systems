const db = require('../db');


function genSelectOrderDishSQL(OrderId, DishId) {
    sql = `SELECT d.DishId, d.DishName, d.Price, o.Amount, d.Price * o.Amount AS TotalDishPrice, d.ImageUrl\
            FROM OrderDishes o NATURAL JOIN Dishes d\
            WHERE o.OrderId = ${OrderId} AND d.DishId = ${DishId}`;

    console.log("SQL:", sql);
    return sql;
}



exports.getFood = (req, res) => {
    const foodName = req.query.foodName;
    const id = req.query.id;
    console.log("Food Name:", foodName);
    const sqlCommand = `SELECT DishId, DishName, Price, ImageUrl, Description
                        FROM Dishes
                        WHERE DishId = (
                            SELECT FavoriteFood
                            FROM Customers
                            WHERE CustomerId = ${id})
                        UNION
                        SELECT DishId, DishName, Price, ImageUrl, Description
                        FROM Dishes
                        WHERE DishId = (
                            SELECT od.DishId
                            FROM Orders o NATURAL JOIN OrderDishes od
                            WHERE CustomerId = ${id}
                            GROUP BY od.DishId
                            ORDER BY count(od.dishId) DESC
                            LIMIT 1)
                        UNION
                        SELECT * FROM Dishes WHERE DishName LIKE "%${foodName}%"`;
    console.log("SQL:", sqlCommand);
    db.query(sqlCommand, (err, result) => {
        res.send(result);
    });

};


exports.addFood = (req, res) => {
    const orderId = req.body.orderId;
    const dishId = req.body.dishId;
    const amount = 1;
    console.log("orderid:", orderId, " dishid:", dishId);
    let sqlCommand = genSelectOrderDishSQL(orderId, dishId);

    db.query(sqlCommand, (err, result) => {
        console.log(result);

        // if not exist, create a new one
        if (result.length === 0) {
            console.log('NOT exist, create new one');
            sqlCommand = `INSERT INTO OrderDishes VALUES (${orderId},${dishId},${amount})`;
        }
        else {
            console.log('Exist, amount+1');
            sqlCommand = `UPDATE OrderDishes SET Amount = Amount + ${amount} WHERE OrderId = ${orderId} AND DishId = ${dishId}`;  
        }
        db.query(sqlCommand);
        console.log("SQL:", sqlCommand);

    });


    // const amount = 1;
    // const sqlCommandInsert = `INSERT INTO OrderDishes VALUES (${orderId},${dishId},${amount})`;
    // const sqlCommandUpdate = `UPDATE OrderDishes\
    //                             SET Amount = Amount + ${amount}\
    //                             WHERE OrderId = ${orderId} AND DishId = ${dishId}`;
    // console.log("SQL:", sqlCommandInsert);
    // db.query(sqlCommandInsert, (err, result) => {
    //     res.send(result);
    // });

};


