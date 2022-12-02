const db = require('../db');

exports.getLoginId = (req, res) => {
    const userid = req.query.userid;
    const password = req.query.password;
    const sqlCommand = `SELECT Password, CustomerId FROM Customers WHERE Phone=${userid};`;
    db.query(sqlCommand, (err, result) => {
        if (result != null && result.length > 0) {
            const cusid = result[0].CustomerId;
            const realPassword = result[0].Password;
            if (password == realPassword) {
                res.send({userid: cusid});
                return;
            }
        }
        res.send({userid: -1});
    })
};
