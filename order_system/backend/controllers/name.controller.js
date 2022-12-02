const db = require('../db');

exports.getName = (req, res) => {
    const id = req.query.id;
    // Select the most popular 10 food
    const sqlCommand = `SELECT Name FROM Customers WHERE CustomerId=${id};`;

    // console.log(sqlCommand);
    db.query(sqlCommand, (err, result) => {
        console.log(result);
        res.send(result);
    });
};
