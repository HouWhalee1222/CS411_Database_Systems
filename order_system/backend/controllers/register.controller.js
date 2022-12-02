const db = require('../db');

function getCustomerInfo(req) {
    const CustomerId = req.body.CustomerId;
    const Password = req.body.Password;
    const Name = req.body.Name;
    const Phone = req.body.Phone;

    return [Name, Password, Phone, CustomerId];
}

function genInsertSQL(CustomerId, Password, Name, Phone) {
    sql = `INSERT INTO Customers(CustomerId, Password, Name, Phone)\
            VALUES(${CustomerId}, "${Password}", "${Name}", "${Phone}")`;

    console.log("SQL:", sql);
    return sql;
}

function genSelectCustomerIdSQL(Phone) {
    sql = `SELECT c.CustomerId\
            FROM Customers c\
            WHERE c.Phone = ${Phone}`;

    console.log("SQL:", sql);
    return sql;
}

exports.submit = (req, res) => {
    const [Name, Password, Phone, CustomerId] = getCustomerInfo(req);
    console.log(Name, Password, Phone, CustomerId);

    let sqlCommand = genInsertSQL(CustomerId, Password, Name, Phone);
    db.query(sqlCommand, (err, result) => {
        if(err) {
            console.log("SQL error:", err.sqlMessage);
            result = {
                sqlErrMessage: err.sqlMessage
            };
            JSON.stringify(result);
            res.send(result);
        } else {
            sqlCommand = genSelectCustomerIdSQL(Phone);
            db.query(sqlCommand, (err, result) => {
                res.send(result);
            });
        }
    });
};
