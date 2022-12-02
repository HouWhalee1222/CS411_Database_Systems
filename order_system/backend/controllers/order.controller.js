const db = require('../db');

function getOrderDishId(req) {
    const OrderId = req.query.OrderId;
    const DishId = req.query.DishId;

    return [OrderId, DishId];
}


function genSelectOrderSQL(OrderId) {
    if (OrderId == "") {
        sql = `SELECT d.DishId, d.DishName, d.Price, o.Amount, d.Price * o.Amount AS TotalDishPrice, d.ImageUrl\
                FROM OrderDishes o NATURAL JOIN Dishes d\
                WHERE o.OrderId >= ALL(SELECT OrderId FROM OrderDishes)`;
    }
    else {
        sql = `SELECT d.DishId, d.DishName, d.Price, o.Amount, d.Price * o.Amount AS TotalDishPrice, d.ImageUrl\
                FROM OrderDishes o NATURAL JOIN Dishes d\
                WHERE o.OrderId = ${OrderId}`;
    }

    console.log("SQL:", sql);
    return sql;
}

function genSelectOrderDishSQL(OrderId, DishId) {
    sql = `SELECT d.DishId, d.DishName, d.Price, o.Amount, d.Price * o.Amount AS TotalDishPrice, d.ImageUrl\
            FROM OrderDishes o NATURAL JOIN Dishes d\
            WHERE o.OrderId = ${OrderId} AND d.DishId = ${DishId}`;

    console.log("SQL:", sql);
    return sql;
}

function genUpdateSQL(OrderId, DishId, update_val) {
    sql = `UPDATE OrderDishes\
            SET Amount = Amount + ${update_val}\
            WHERE OrderId = ${OrderId} AND DishId = ${DishId}`;

    console.log("SQL:", sql);
    return sql;
}

function genDeleteSQL(OrderId, DishId) {
    sql = `DELETE FROM OrderDishes\
            WHERE OrderId = ${OrderId} AND DishId = ${DishId}`;

    console.log("SQL:", sql);
    return sql;
}

function returnOrderResult(OrderId, res) {
    console.log("Return order for OrderId =", OrderId);

    let sqlCommand = genSelectOrderSQL(OrderId);
    db.query(sqlCommand, (err, result) => {
        res.send(result);
    });
}

exports.getOrder = (req, res) => {
    const OrderId = req.query.OrderId;
    returnOrderResult(OrderId, res);
};

exports.addDish = (req, res) => {
    const [OrderId, DishId] = getOrderDishId(req);

    let sqlCommand = genUpdateSQL(OrderId, DishId, 1);
    db.query(sqlCommand);

    returnOrderResult(OrderId, res);
};

exports.minusDish = (req, res) => {
    const [OrderId, DishId] = getOrderDishId(req);

    let sqlCommand = genSelectOrderDishSQL(OrderId, DishId);
    db.query(sqlCommand, (err, result) => {
        let amount = result[0].Amount;

        // Remove the record if the amount will become 0
        sqlCommand = "";
        if (amount > 1) {
            sqlCommand = genUpdateSQL(OrderId, DishId, -1);
        } else {
            sqlCommand = genDeleteSQL(OrderId, DishId);
        }
        db.query(sqlCommand);

        returnOrderResult(OrderId, res);
    });
};

exports.deleteDish = (req, res) => {
    const [OrderId, DishId] = getOrderDishId(req);

    let sqlCommand = genDeleteSQL(OrderId, DishId);
    db.query(sqlCommand);

    returnOrderResult(OrderId, res);
};


exports.checkoutOrder = (req, res) => {
    const [OrderId, CustomerId] = [req.query.OrderId, req.query.CustomerId];

    let call = `CALL GetTotalPrice(${CustomerId}, ${OrderId}, @total, @oriTotal, @preTotal, @visits, @discount);`;
    let get = `SELECT @total, @oriTotal, @preTotal, @visits, @discount;`;
    db.query(call);
    db.query(get, (err, result) => {
        console.log(call);
        console.log(result);
        res.send(result);
    });

};
