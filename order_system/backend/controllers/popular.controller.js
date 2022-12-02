const db = require('../db');

exports.getPopular = (req, res) => {
    // Select the most popular 10 food
    const id = req.query.id;
    const sqlCommand = `SELECT DishId, DishName, Price, Description, ImageUrl
    FROM Dishes
    WHERE DishId = (
        SELECT FavoriteFood
        FROM Customers
        WHERE CustomerId = ${id})
    UNION
    SELECT DishId, DishName, Price, Description, ImageUrl
    FROM Dishes
    WHERE DishId = (
        SELECT od.DishId
        FROM Orders o NATURAL JOIN OrderDishes od
        WHERE CustomerId = ${id}
        GROUP BY od.DishId
        ORDER BY count(od.dishId) DESC
        LIMIT 1)
    UNION
    (SELECT d.DishId, d.DishName, d.Price, d.Description, d.ImageUrl
    FROM Customers c JOIN Dishes d ON c.FavoriteFood = d.DishId JOIN
    (SELECT DishId, COUNT(IngredientId) as Ingredient_Count FROM Recipes GROUP BY DishId) as t ON c.FavoriteFood = t.DishId
    GROUP BY c.FavoriteFood
    ORDER BY COUNT(FavoriteFood) DESC, d.Price, d.DishName, Ingredient_Count LIMIT 10)`;
    console.log(sqlCommand);
    db.query(sqlCommand, (err, result) => {
        console.log(result);
        res.send(result);
    });
};
